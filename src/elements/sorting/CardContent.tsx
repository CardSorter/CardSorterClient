import React, { MouseEvent } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import * as sortingBoardAction from "../../actions/sorting/sortingBoardAction";
import IconButton from "@mui/material/IconButton";

interface CardContentProps {
  id: number;
  title: string;
  description?: string;
  minimized: boolean;
  position: number;
  showDescription?: boolean;
}

const CardContent: React.FC<CardContentProps> = ({
  id,
  title,
  description,
  minimized,
  position,
  showDescription,
}) => {
  // Dispatch
  const dispatch = useDispatch();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (description && description.length > 0) {
      dispatch(sortingBoardAction.toggleDescription({ cardID: id }));
    }
  };

  return (
    <li className={`${!minimized ? "card " : "card minimized"} `}>
      {/* Show the description */}
      {!minimized && (
        <>
          <h4>{title}</h4>
          <p>{description}</p>
        </>
      )}

      {minimized && (
        <div className="titles ">
          <h4>{title}</h4>
          {showDescription && <p>{description}</p>}
        </div>
      )}
      {/* Show the description button */}
      {minimized && description && (
        <IconButton
          aria-label="Expand description"
          onClick={onClick}
          className={showDescription ? "open" : ""}
        >
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </IconButton>
      )}
      {/* The "drag to add" action */}
    </li>
  );
};

export default CardContent;
