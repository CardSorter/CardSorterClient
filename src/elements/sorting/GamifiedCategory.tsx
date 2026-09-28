import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import StateSchema from "reducers/StateSchema";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import { SortingCard } from "../../reducers/sorting/sortingBoardReducer";
import { useTranslations } from "next-intl";
import * as uiActions from "actions/sorting/uiAction";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GamifiedCardItem from "./GamifiedCardItem";

interface CategoryProps {
  id: number;
  title?: string;
  color?: string;
  cards: SortingCard[];
  predefined?: boolean;
  insertAtIndex?: number;
  isOverlay?: boolean;
  onSortAnimation?: () => void;
  innerRef?: (el: HTMLLIElement | null) => void;
}

const GamifiedCategory: React.FC<CategoryProps> = ({
  id,
  title,
  color,
  cards,
  predefined,
  isOverlay,
  insertAtIndex,
  onSortAnimation,
  innerRef,
}) => {
  const t = useTranslations("SortingPage");

  const [preliminaryTitle, setPreliminaryTitle] = useState(title || "");
  const [showEditTitle, setShowEditTitle] = useState(false);

  const [bgColor, setBgColor] = useState(color || "#ffffff");
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const presetColors = [
    "#ffffff",
    "#ff9e9e",
    "#ffb380",
    "#ffecb3",
    "#d4e1a1",
    "#b9ebeb",
    "#a9c9f4",
    "#c9c1f2",
    "#ef98c7",
  ];

  const handleColorClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPicker((prev) => !prev);
  };

  const applyPresetColor = (preset: string) => {
    setBgColor(preset);
    dispatch(
      sortingBoardAction.addColorCategory({
        categoryID: id,
        color: preset,
      }),
    );
    setShowPicker(false);
  };

  const openColorWheel = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
    setShowPicker(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showPicker]);

  const categories = useSelector(
    (state: StateSchema) => state.sortingBoard.categories,
  );
  const existingTitles = Object.values(categories)
    .filter((cat) => cat.id !== id) // exclude the current one
    .map((cat) => cat.title?.trim().toLowerCase());

  // State
  const isMinimized = useSelector(
    (state: StateSchema) => state.sortingBoard.categories[id].isMinimized,
  );

  // Dispatch
  const dispatch = useDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !!isOverlay });

  const rawTransform = CSS.Transform.toString(transform);
  const translateOnly = rawTransform
    ? rawTransform.replace(/scaleY\([^)]*\)/g, "")
    : undefined;

  const style: React.CSSProperties = {
    transform: translateOnly,
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  const onTitleClick = (event: MouseEvent<HTMLHeadingElement>) => {
    if (predefined) return;
    event.stopPropagation();
    setShowEditTitle(true);
  };

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    let title = event.target.value || "";
    title = title.replace(/\s\s+/g, " ");
    setPreliminaryTitle(title.length > 0 ? title : "");
  };

  const onTitleFinish = (
    event?: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    if (event) {
      event.stopPropagation();
      if (event.code !== "Enter") return;
    }

    const normalizedNewTitle = preliminaryTitle.trim().toLowerCase();

    if (existingTitles.includes(normalizedNewTitle)) {
      dispatch(
        uiActions.showCategoriesWithSameNameError({
          categoriesList: [preliminaryTitle],
        }),
      );
      return;
    }

    dispatch(
      sortingBoardAction.renameCategory({
        categoryID: id,
        title: preliminaryTitle,
      }),
    );
    setShowEditTitle(false);
  };

  const onMinimized = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(sortingBoardAction.minimizeCategory({ id }));
  };

  const setCategoryColor = () => {
    if (inputRef.current) {
      dispatch(
        sortingBoardAction.addColorCategory({
          categoryID: id,
          color: inputRef.current.value,
        }),
      );
      setBgColor(inputRef.current.value);
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    input.addEventListener("change", setCategoryColor);
    return () => input.removeEventListener("change", setCategoryColor);
  }, []);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "card-drag",
      drop: (card: { id: number; position: number }) => {
        // Remove card from any other category it may belong
        if (card.position > -1) {
          dispatch(
            sortingBoardAction.removeCardFromCategory({
              cardID: card.id,
              categoryID: card.position,
            }),
          );
        }

        dispatch(
          sortingBoardAction.addCardToCategory({
            categoryID: id,
            cardID: card.id,
          }),
        );
        if (onSortAnimation) {
          onSortAnimation();
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [id],
  );

  const setRefs = (el: HTMLLIElement | null) => {
    setNodeRef(el);
    drop(el);
    if (innerRef) innerRef(el);
  };

  let classString = "category";
  if (isOver) {
    classString += " max-height";
  }
  if (isMinimized) {
    classString += " minimized";
  }
  if (isOverlay) classString += " dragging-overlay";

  return (
    // @ts-ignore
    <li
      className={classString}
      ref={setRefs}
      style={{ ...style, backgroundColor: bgColor }}
      {...attributes}
    >
      <div className="header">
        {!isOverlay && (
          <span
            className="material-symbols-outlined drag-handle"
            {...listeners}
            style={{ cursor: "grab", touchAction: "none", color: "#8582826b" }}
          >
            drag_indicator
          </span>
        )}
        {showEditTitle ? (
          <div className="title-input">
            <TextField
              label="Title"
              variant="outlined"
              autoFocus
              value={preliminaryTitle}
              onBlur={() => onTitleFinish()}
              onChange={onTitleChange}
              onKeyUp={onTitleFinish}
            />

            <IconButton
              aria-label="Expand description"
              onClick={() => onTitleFinish}
            >
              <span className="material-symbols-outlined">check</span>
            </IconButton>
          </div>
        ) : (
          <h3 onClick={onTitleClick} title={title}>
            {title || t("click to rename")}
          </h3>
        )}
      </div>
      {isOver && (
        <div className="drop-to-add">
          <span className="material-symbols-outlined">add</span>
          <p>{t("drop to add")}</p>
        </div>
      )}
      <ul style={{ background: bgColor }}>
        {cards.map((card) => (
          <GamifiedCardItem
            key={card.id}
            id={card.id}
            title={card.name}
            description={card.description}
            minimized={true}
            position={id}
            showDescription={card.descriptionShowing}
          />
        ))}
      </ul>
      <div
        className="card-count-footer"
        style={{ position: "relative", backgroundColor: bgColor }}
      >
        <span style={{ paddingLeft: "0.5rem" }}>
          {cards.length} {cards.length === 1 ? "card" : "cards"}
        </span>
        <button
          onClick={handleColorClick}
          style={{
            width: 20,
            height: 20,
            border: "none",
            background: "none",
            cursor: "pointer",
            outline: "none",
            padding: 0,
            paddingRight: "1.5rem",
            flexShrink: 0,
          }}
        >
          <span className="material-symbols-outlined">palette</span>
        </button>
        <input
          ref={inputRef}
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="changeColor"
          style={{
            position: "absolute",
            opacity: 0,
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        />
        {showPicker && (
          <div
            ref={pickerRef}
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "#fff",
              borderRadius: 25,
              padding: "1rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              zIndex: 9,
              minWidth: 180,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 10,
              }}
            >
              {presetColors.map((preset) => (
                <button
                  key={preset}
                  onClick={() => applyPresetColor(preset)}
                  title={preset}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: preset,
                    border:
                      bgColor === preset
                        ? "2px solid #6366f1"
                        : "1px solid #d1d5db",
                    cursor: "pointer",
                    padding: 0,
                    outline: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={openColorWheel}
              style={{
                display: "flex",
                justifySelf: "end",
                alignItems: "center",
                gap: 6,
                padding: "5px ",
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                cursor: "pointer",
                fontSize: 14,
                color: "#48494a",
              }}
            >
              <span className="material-symbols-outlined">colorize</span>
              Custom color
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default GamifiedCategory;
