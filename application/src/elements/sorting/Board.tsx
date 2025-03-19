import React from 'react';
import {DropTargetMonitor, useDrop} from 'react-dnd';

import Category from "./Category";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import {useTranslations} from "next-intl";


const Board = () => {
  const t = useTranslations("SortingPage");

  // State
  const categories = useSelector((state: StateSchema) => state.sortingBoard.categories);

  // Dispatch
  const dispatch = useDispatch();

  const [{isOver}, dropRef] = useDrop({
    accept: 'card-drag',
    drop: (card: { id: number; position: any }, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop()) {
          if (card.position > -1) {
            // The card belongs to a category and it is being moved to a
            // new one
            dispatch(sortingBoardAction.removeCardFromCategory({cardID: card.id, categoryID: card.position}));
          }
          dispatch(sortingBoardAction.createCategory({categoryID: undefined, cardID:card.id}));
      }

      // Remove empty categories
      for (const i in categories) {
        if (categories[i].cards.length < 1) {
          // Only one category can be empty on each state update
          dispatch(sortingBoardAction.removeCategory({categoryID: categories[i].id}));
          break;
        }
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver({shallow: true}),
    }),
  });

  return (
    // @ts-ignore
    <ul id="board" ref={dropRef}>
      {Object.values(categories).map((category) => (
        <Category
          key={'k' + category.id}
          id={category.id}
          title={category.title}
          cards={category.cards}
        />
      ))}
      {isOver && (
        <div className="category drop-to-create">
          <span className="material-symbols-outlined">add</span>
          <p>{t("drop to create category")}</p>
        </div>
      )}
    </ul>
  );
};

export default Board;
