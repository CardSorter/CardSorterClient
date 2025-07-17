import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from "react-redux";

import CardItem from './CardItem';
import StateSchema from "reducers/StateSchema";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import {SortingCard} from "../../reducers/sorting/sortingBoardReducer";
import {useTranslations} from "next-intl";
import * as uiActions from "actions/sorting/uiAction";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";

interface CategoryProps {
  id: number;
  title?: string;
  cards: SortingCard[];
  predefined?: boolean;
}


const Category: React.FC<CategoryProps> = ({id, title, cards, predefined}) => {
  const t = useTranslations("SortingPage");

  const [preliminaryTitle, setPreliminaryTitle] = useState(title || "");
  const [showEditTitle, setShowEditTitle] = useState(false);

  const categories = useSelector((state: StateSchema) => state.sortingBoard.categories);
  const existingTitles = Object.values(categories)
    .filter((cat) => cat.id !== id) // exclude the current one
    .map((cat) => cat.title?.trim().toLowerCase());


  // State
  const isMinimized = useSelector((state: StateSchema) => (state.sortingBoard.categories[id].isMinimized));

  // Dispatch
  const dispatch = useDispatch();

  const onTitleClick = (event: MouseEvent<HTMLHeadingElement>) => {
    if (predefined) return;
    event.stopPropagation();
    setShowEditTitle(true);
  }

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    let title = event.target.value || "";
    title = title.replace(/\s\s+/g, ' ');
    setPreliminaryTitle((title.length > 0) ? title : "");
  }

  const onTitleFinish = (event?: KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (event) {
      event.stopPropagation();
      if (event.code !== "Enter") return;
    }
  
    const normalizedNewTitle = preliminaryTitle.trim().toLowerCase();
  
    if (existingTitles.includes(normalizedNewTitle)) {
      dispatch(uiActions.showCategoriesWithSameNameError({ categoriesList: [preliminaryTitle] }));
      return;
      
    }
  
    dispatch(sortingBoardAction.renameCategory({ categoryID: id, title: preliminaryTitle }));
    setShowEditTitle(false);
  }

  const onMinimized = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(sortingBoardAction.minimizeCategory({id}));
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: "card-drag",
    drop: (card: { id: number; position: number }) => {
      // Remove card from any other category it may belong
      if (card.position > -1) {
        dispatch(sortingBoardAction.removeCardFromCategory({cardID: card.id, categoryID: card.position}));
      }

      dispatch(sortingBoardAction.addCardToCategory({categoryID: id, cardID: card.id}));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [id]);

  let classString = 'category';
  if (isOver) {
    classString += ' max-height';
  }
  if (isMinimized) {
    classString += ' minimized';
  }

  return (
    // @ts-ignore
    <li className={classString} ref={drop}>
      <div className="header">
        {showEditTitle ? (
          <div className="title-input">
            <TextField label="Title"
                       variant="outlined"
                       autoFocus
                       value={preliminaryTitle}
                       onBlur={() => onTitleFinish()}
                       onChange={onTitleChange}
                       onKeyUp={onTitleFinish}
            />

            <IconButton aria-label="Expand description" onClick={() => onTitleFinish}>
              <span className="material-symbols-outlined">check</span>
            </IconButton>
          </div>
        ) : (
          <>
            <h3 onClick={onTitleClick} title={title}>
              {title || t("click to rename")}</h3>

            <IconButton aria-label="Expand description" onClick={onMinimized} className="minimize">
              <span className="material-symbols-outlined">{isMinimized ? "expand_content" : "minimize"}</span>
            </IconButton>
          </>
        )}
      </div>
      {isOver && (
        <div className="drop-to-add">
          <span className="material-symbols-outlined">add</span>
          <p>{t("drop to add")}</p>
        </div>
      )}
      <ul>
        {cards.map((card) => (
          <CardItem key={card.id} id={card.id} title={card.name}
                    description={card.description} minimized={true}
                    position={id}
                    showDescription={card.descriptionShowing}/>
        ))}
      </ul>
      <div className="card-count-footer">
       {cards.length} {cards.length === 1 ? "card" : "cards"}
      </div>
    </li>
  );
};

export default Category;
