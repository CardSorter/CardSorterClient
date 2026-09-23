"use client";
import { useState, useEffect, useRef } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import { playSound } from "../../utils/audio/sounds";
import GamifiedCardItem from "./GamifiedCardItem";

const GamifiedList: React.FC = () => {
  // State
  const unsortedCards = useSelector(
    (state: StateSchema) => state.sortingBoard.unsortedCards,
  );
  const categories = useSelector(
    (state: StateSchema) => state.sortingBoard.categories,
  );
  const sortType = useSelector(
    (state: StateSchema) => state.sortingUi?.sortType ?? "open",
  );

  // Dispatch
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: "card-drag",
    drop: (
      item: { id: number; position: number },
      monitor: DropTargetMonitor,
    ) => {
      // If the card is already in container
      if (item.position === -1) return;
      playSound("play");

      dispatch(
        sortingBoardAction.removeCardFromCategory({
          cardID: item.id,
          categoryID: item.position,
          preserve: sortType === "closed",
        }),
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [phase, setPhase] = useState("stacked");
  const [spread, setSpread] = useState(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  const updateScrollButtons = () => {
    const container = listRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    // small buffer (1px) to avoid float rounding issues
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    updateScrollButtons();

    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  useEffect(() => {
    updateScrollButtons();
  }, [unsortedCards, spread, phase]);

  useEffect(() => {
    setPhase("stacked");

    const t = setTimeout(() => {
      setPhase("spreading");
      playSound("shuffle");
    }, 300);

    const t2 = setTimeout(() => {
      setSpread(true);
      updateScrollButtons();
    }, 1000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);
  // setPhase("spread");

  const STACK_POSITIONS = [
    { x: "0%", y: "60px", rot: "-5deg" }, // 1
    { x: "10%", y: "80px", rot: "12deg" }, // 2
    { x: "20%", y: "70px", rot: "-3deg" }, // 3
    { x: "15%", y: "90px", rot: "5deg" }, // 4
    { x: "20%", y: "75px", rot: "-13deg" }, // 5
    { x: "30%", y: "75px", rot: "-8deg" }, // 6
    { x: "40%", y: "90px", rot: "8deg" }, // 7
    { x: "50%", y: "95px", rot: "-8deg" }, // 8
    { x: "-15%", y: "65px", rot: "-10deg" }, // 9
    { x: "-5%", y: "75px", rot: "10deg" }, // 10
  ];

  function getSpreadTransform(index: number) {
    const n = index + 1; // 1-indexed
    if (n % 3 === 0) return { rot: "1deg", ty: "32px" };
    if (n % 2 === 0) return { rot: "3deg", ty: "34px" };
    return { rot: "-3deg", ty: "34px" };
  }

  const isSpreading = phase === "spreading";
  const isStacked = phase === "stacked";
  const isSpread = spread;
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  function scrollContainer(amount: any) {
    const container = document.getElementById("list");
    container?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
    console.log("clicked", container);
  }

  return (
    <>
      {canScrollLeft && (
        <button
          id="scroll-left"
          onClick={() => scrollContainer(-300)}
          style={{
            position: "fixed",
            left: "3rem",
            bottom: "6rem",
            width: "3rem",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e2e0e7",
            background: "#352466de",
            border: "none",
            padding: 0,
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 999999,
            pointerEvents: "auto",
            boxShadow: "0px 0px 20px 2px #63606048",
          }}
        >
          <span className="material-symbols-outlined">keyboard_arrow_left</span>
        </button>
      )}
      {/*  @ts-ignore */}
      <ul
        id="list"
        ref={(node) => {
          drop(node);
          listRef.current = node;
        }}
      >
        {unsortedCards.map((card, index) => {
          const stackPos = STACK_POSITIONS[index % 10];
          const spread = getSpreadTransform(index);

          const stackTransform = `translateX(0) translateY(54px) rotate(${stackPos.rot})`;

          const cardWidth = 165;
          const overlapPx = -30;
          const step = cardWidth + overlapPx;

          const spreadOffsetX = index * step;

          const spreadTransform = `translateX(${spreadOffsetX}px) translateY(${spread.ty}) rotate(${spread.rot})`;
          return (
            <div
              className={
                (isSpreading || isStacked) && !isSpread
                  ? "cards stacked "
                  : "cards "
              }
              key={card.id}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "absolute",
                bottom: 0,
                left: isStacked ? "50%" : "0",
                zIndex: hoveredId === card.id ? 9999999 : 9999 + index,
                transform: isSpreading ? spreadTransform : stackTransform,
                transition: isSpreading
                  ? `transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) ${index * 25}ms,left 0.25s linear `
                  : "none",
              }}
            >
              <GamifiedCardItem
                key={card.id}
                id={card.id}
                title={card.name}
                description={card.description}
                position={-1}
                minimized={false}
              />
            </div>
          );
        })}
      </ul>
      {canScrollRight && (
        <button
          id="scroll-right"
          onClick={() => scrollContainer(+300)}
          style={{
            position: "fixed",
            bottom: "6rem",
            right: "3rem",
            width: "3rem",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e2e0e7",
            background: "#352466de",
            border: "none",
            padding: 0,
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 999999,
            pointerEvents: "auto",
            boxShadow: "0px 0px 20px 2px #63606048",
          }}
        >
          <span className="material-symbols-outlined">
            keyboard_arrow_right
          </span>
        </button>
      )}
    </>
  );
};

export default GamifiedList;
