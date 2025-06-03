import React from 'react';
import {DropTargetMonitor, useDrop} from 'react-dnd';

import Category from "./Category";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import {useTranslations} from "next-intl";
import { sort } from 'd3';





const Board = () => {
  const t = useTranslations("SortingPage");
  const state = useSelector((state: StateSchema) => state);
  console.log('Full Redux state:', state); 
  


  // State
  const categories = useSelector((state: StateSchema) => state.sortingBoard.categories);

  // In which mode you are closed/open/hybrid
  
  const sortType = useSelector((state: StateSchema) => state.sortingUi?.sortType ?? 'open');
  


  // Dispatch
  const dispatch = useDispatch();

  const [{isOver}, dropRef] = useDrop({
    accept: 'card-drag',
    drop: (card: { id: number; position: any }, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop() && (sortType==="open" || sortType==="hybrid")) {
          if (card.position > -1) {
            // The card belongs to a category 
            
            dispatch(sortingBoardAction.removeCardFromCategory({cardID: card.id, categoryID: card.position, preserve: false}));
          }
          dispatch(sortingBoardAction.createCategory({categoryID: undefined, cardID:card.id}));
      }

      // Remove empty categories
      if(sortType === "open"  ){
       for (const i in categories) {
        if (categories[i].cards.length < 1 ) {
          // Only one category can be empty on each state update
          dispatch(sortingBoardAction.removeCategory({categoryID: categories[i].id}));
          break;
        }
       }
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver({shallow: true}),
    }),
  });
  Object.values(categories).forEach((category) => {
    
    if (!Array.isArray(category.cards)) {
      console.warn("category.cards is not an array! Value:", category.cards);
    }
  });
  
  
  return (
    // @ts-ignore
    <div id="board" ref={dropRef} className="category-board">
      {Object.values(categories).map((category) => (
        <Category
         key={'k' + category.id}
         id={category.id}
         title={category.title}
         cards={category.cards}
        />
      ))}
      {isOver && (sortType === "open" || sortType === "hybrid") && (
        <div className="category drop-to-create">
         <span className="material-symbols-outlined">add</span>
         <p>{t("drop to create category")}</p>
        </div>
      )}
    </div>
  )
};


export default Board;
