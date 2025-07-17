import React, {MouseEvent} from 'react';
import {useDrag} from 'react-dnd';
import {useDispatch} from "react-redux";
import * as sortingBoardAction from "../../actions/sorting/sortingBoardAction";
import IconButton from '@mui/material/IconButton';

interface CardItemProps {
  id: number;
  title: string;
  description?: string;
  minimized: boolean;
  position: number;
  showDescription?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({id, title, description, minimized, position, showDescription}) => {

  // Dispatch
  const dispatch = useDispatch();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (description && description.length > 0) {
      dispatch(sortingBoardAction.toggleDescription({cardID: id}));
    }
  }

  const [{isDragging}, dragRef] = useDrag(() => ({
    type: "card-drag",
    item: {id, position},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li
      // @ts-ignore
      ref={dragRef}
      className={`${!minimized ? 'card' : 'card minimized'} ${
        isDragging ? 'dragging' : ''
      }`}
    >
      {/* Show the description */}
      {!minimized && (
        <>
          <h4>{title}</h4>
          <p>{description}</p>
        </>
      )}

      {minimized && (
        <div className="titles">
          <h4>{title}</h4>
          {showDescription && <p>{description}</p>}
        </div>
      )}
      {/* Show the description button */}
      {minimized && description && (
        <IconButton aria-label="Expand description" onClick={onClick} className={showDescription ? "open" : ""}>
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </IconButton>
      )}
      {/* The "drag to add" action */}
    </li>
  );
};

export default CardItem;
