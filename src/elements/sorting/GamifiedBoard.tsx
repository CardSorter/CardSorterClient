import React, { useEffect, useRef, useState } from "react";
import { DropTargetMonitor, useDrop, useDragLayer } from "react-dnd";

import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import { useTranslations } from "next-intl";
import ProgressBar from "./ProgressBar/ProgressBar";
import { SortingCategory } from "reducers/sorting/sortingBoardReducer";
import { DragOverlay } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { playSound } from "utils/audio/sounds";
import GamifiedCategory from "./GamifiedCategory";

interface BoardProps {
  activeCategory: SortingCategory | null;
}

const GamifiedBoard = ({ activeCategory }: BoardProps) => {
  const t = useTranslations("SortingPage");

  // Clap animation
  const [showClap, setShowClap] = useState(false);
  const clapTimer = useRef<NodeJS.Timeout | null>(null);

  // Fire animation
  const [showFire, setShowFire] = useState(false);
  const fireTimer = useRef<NodeJS.Timeout | null>(null);

  // Track sorts for streaks
  const lastSortTime = useRef<number | null>(null);
  const STREAK_WINDOW_MS = 2200;

  useEffect(() => {
    return () => {
      if (clapTimer.current) {
        clearTimeout(clapTimer.current);
      }
      if (fireTimer.current) {
        clearTimeout(fireTimer.current);
      }
    };
  }, []);

  // State
  const categories = useSelector(
    (state: StateSchema) => state.sortingBoard.categories,
  );

  // In which mode you are closed/open/hybrid

  const sortType = useSelector(
    (state: StateSchema) => state.sortingUi?.sortType ?? "open",
  );

  const categoryOrder = useSelector(
    (state: StateSchema) => state.sortingBoard.categoryOrder,
  );

  const categoryRefs = useRef<Record<number, HTMLElement | null>>({});

  const { isDraggingCard, clientOffset } = useDragLayer((monitor) => ({
    isDraggingCard:
      monitor.isDragging() && monitor.getItemType() === "card-drag",
    clientOffset: monitor.getClientOffset(),
  }));

  const getInsertIndex = (): number => {
    if (!clientOffset) return categoryOrder.length;
    // Group categories into rows by their top position
    const entries = categoryOrder
      .map((id, index) => {
        const el = categoryRefs.current[id];
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { id, index, rect };
      })
      .filter(Boolean) as { id: number; index: number; rect: DOMRect }[];

    if (entries.length === 0) return categoryOrder.length;

    // If the cursor is below the lowest row, insert at the end
    const lowestBottom = Math.max(...entries.map((e) => e.rect.bottom));
    if (clientOffset.y > lowestBottom) {
      return categoryOrder.length;
    }

    const rowTops = [
      ...new Set(entries.map((e) => Math.round(e.rect.top / 10) * 10)),
    ];

    const cursorRowTop = rowTops.reduce(
      (closest, top) =>
        Math.abs(top - clientOffset.y) < Math.abs(closest - clientOffset.y)
          ? top
          : closest,
      rowTops[0],
    );
    // Filter to only entries on that row
    const rowEntries = entries.filter(
      (e) => Math.round(e.rect.top / 10) * 10 === cursorRowTop,
    );

    // Within the row, find insert position by x
    for (const entry of rowEntries) {
      if (clientOffset.x < entry.rect.left + entry.rect.width / 2) {
        return entry.index;
      }
    }

    // Cursor is past the last item in the row — insert after last item in that row
    return rowEntries[rowEntries.length - 1].index + 1;
  };
  const hoveredGapIndex = isDraggingCard ? getInsertIndex() : null;
  // Dispatch
  const dispatch = useDispatch();

  // Shared sort animation handler — shows fire on streak, clap otherwise (never both)
  const handleSortAnimation = () => {
    const now = Date.now();
    const isStreak =
      lastSortTime.current !== null &&
      now - lastSortTime.current <= STREAK_WINDOW_MS;
    lastSortTime.current = now;

    if (isStreak) {
      // Fire: cancel clap, show fire
      setShowClap(false);
      if (clapTimer.current) clearTimeout(clapTimer.current);
      setShowFire(true);
      if (fireTimer.current) clearTimeout(fireTimer.current);
      fireTimer.current = setTimeout(() => setShowFire(false), 1200);
    } else {
      // Clap: cancel fire, show clap
      setShowFire(false);
      if (fireTimer.current) clearTimeout(fireTimer.current);
      setShowClap(true);
      if (clapTimer.current) clearTimeout(clapTimer.current);
      clapTimer.current = setTimeout(() => setShowClap(false), 1200);
    }
    playSound("table");
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "card-drag",
    drop: (card: { id: number; position: any }, monitor: DropTargetMonitor) => {
      if (
        !monitor.didDrop() &&
        (sortType === "open" || sortType === "hybrid")
      ) {
        if (card.position > -1) {
          // The card belongs to a category

          dispatch(
            sortingBoardAction.removeCardFromCategory({
              cardID: card.id,
              categoryID: card.position,
              preserve: false,
            }),
          );
        }

        dispatch(
          sortingBoardAction.createCategory({
            categoryID: undefined,
            cardID: card.id,
            insertAtIndex: getInsertIndex(),
          }),
        );
        handleSortAnimation();
      }

      // Remove empty categories
      if (sortType === "open") {
        for (const i in categories) {
          if (categories[i].cards.length < 1) {
            // Only one category can be empty on each state update
            dispatch(
              sortingBoardAction.removeCategory({
                categoryID: categories[i].id,
              }),
            );

            break;
          }
        }
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });
  Object.values(categories).forEach((category) => {
    if (!Array.isArray(category.cards)) {
      console.warn("category.cards is not an array! Value:", category.cards);
    }
  });

  return (
    <>
      <ProgressBar />

      {/* @ts-ignore */}
      <div id="board" ref={dropRef} className="category-board">
        <SortableContext items={categoryOrder} strategy={rectSortingStrategy}>
          {isOver &&
            (sortType === "open" || sortType === "hybrid") &&
            isDraggingCard &&
            hoveredGapIndex === 0 && (
              <div className=" category drop-to-create active">
                <span className="material-symbols-outlined">add</span>
                <p>{t("drop to create category")}</p>
              </div>
            )}
          {categoryOrder.map((id, index) => {
            const category = categories[id];
            if (!category) return null;
            return (
              <React.Fragment key={id}>
                <GamifiedCategory
                  id={category.id}
                  title={category.title}
                  cards={category.cards}
                  color={category.color}
                  predefined={category.predefined}
                  onSortAnimation={handleSortAnimation}
                  innerRef={(el) => {
                    categoryRefs.current[id] = el;
                  }}
                />
                {isOver &&
                  (sortType === "open" || sortType === "hybrid") &&
                  isDraggingCard &&
                  hoveredGapIndex === index + 1 && (
                    <div className="category drop-to-create active">
                      <span className="material-symbols-outlined">add</span>
                      <p>{t("drop to create category")}</p>
                    </div>
                  )}
              </React.Fragment>
            );
          })}
        </SortableContext>

        <DragOverlay>
          {activeCategory ? (
            <GamifiedCategory
              id={activeCategory.id}
              title={activeCategory.title}
              cards={activeCategory.cards}
              color={activeCategory.color}
              predefined={activeCategory.predefined}
              isOverlay
            />
          ) : null}
        </DragOverlay>
        {/* {isOver && (sortType === "open" || sortType === "hybrid") && (
          <div className="category drop-to-create">
            <span className="material-symbols-outlined">add</span>
            <p>{t("drop to create category")}</p>
          </div>
        )} */}
        <div className={`clap-animation${showClap ? " active" : ""}`}>👏</div>
        <div className={`fire-animation${showFire ? " active" : ""}`}>🔥</div>
      </div>
    </>
  );
};

export default GamifiedBoard;
