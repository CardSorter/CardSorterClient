import React, {useEffect} from 'react';
import CardItem from './CardItem';
import {DropTargetMonitor, useDrop} from 'react-dnd';
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";

const List: React.FC = () => {

  // State
  const unsortedCards = useSelector((state: StateSchema) => state.sortingBoard.unsortedCards);
  const categories = useSelector((state: StateSchema) => state.sortingBoard.categories);

  // Dispatch
  const dispatch = useDispatch();

  const [{isOver}, drop] = useDrop({
    accept: 'card-drag',
    drop: (item: { id: number; position: number }, monitor: DropTargetMonitor) => {
      // If the card is already in container
      if (item.position === -1) return;

      dispatch(sortingBoardAction.removeCardFromCategory({cardID: item.id, categoryID: item.position}));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    //@ts-ignore
    <ul id='list' ref={drop}>
      {unsortedCards.map((card) => (
        <CardItem
          key={card.id}
          id={card.id}
          title={card.name}
          description={card.description}
          position={-1}
          minimized={false}
        />
      ))}
    </ul>
  );
};

export default List;
