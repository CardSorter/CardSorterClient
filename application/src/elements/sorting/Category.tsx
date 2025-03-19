import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from "react-redux";

import CardItem from './CardItem';
import StateSchema from "reducers/StateSchema";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import {SortingCard} from "../../reducers/sorting/sortingBoardReducer";
import {useTranslations} from "next-intl";

interface CategoryProps {
  id: number;
  title?: string;
  cards: SortingCard[];
}

const Category: React.FC<CategoryProps> = ({id, title, cards}) => {
  const t = useTranslations("SortingPage");

  const [preliminaryTitle, setPreliminaryTitle] = useState(title || "");
  const [showEditTitle, setShowEditTitle] = useState(false);

  // State
  const isMinimized = useSelector((state: StateSchema) => (state.sortingBoard.categories[id].isMinimized));

  // Dispatch
  const dispatch = useDispatch();

  const onTitleClick = (event: MouseEvent<HTMLHeadingElement>) => {
    event.stopPropagation();
    setShowEditTitle(true);
  }

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let title = event.target.value || "";
    title = title.replace(/\s\s+/g, ' ');
    setPreliminaryTitle((title.length > 0) ? title : t("click to rename"));
  }

  const onTitleFinish = (event?: KeyboardEvent<HTMLInputElement>) => {
    if (!event) {
      dispatch(sortingBoardAction.renameCategory({categoryID: id, title: preliminaryTitle}));
      setShowEditTitle(false);
      return;
    }

    event.stopPropagation();
    if (event.code === "Enter") {
      dispatch(sortingBoardAction.renameCategory({categoryID: id, title: preliminaryTitle}));
      setShowEditTitle(false);
    }
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
            <input autoFocus type="text"
                   placeholder={title || t("click to rename")}
                   defaultValue={title}
                   onBlur={() => onTitleFinish()}
                   onChange={onTitleChange}
                   onKeyUp={onTitleFinish}
                   onClick={(e) => e.stopPropagation()}/>
            <button type="button" onClick={() => onTitleFinish()}>
              <span className="material-symbols-outlined">check</span>
            </button>
          </div>
        ) : (
          <>
            <h3 onClick={onTitleClick}>
              {title || t("click to rename")}</h3>
            <button className="minimize" onClick={onMinimized}>
              <span className="material-symbols-outlined">minimize</span>
            </button>
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
    </li>
  );
};

export default Category;
