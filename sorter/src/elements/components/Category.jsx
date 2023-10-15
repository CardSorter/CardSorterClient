// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { itemTypes } from '../../staticContent/dragConstants';
// eslint-disable-next-line no-unused-vars
import CardItem from './CardItem.jsx';
// eslint-disable-next-line no-unused-vars
import ConfirmPopUp from './ConfirmPopUp.jsx';
import parseCards from '../../helpers/cardParser';
import L from '../../localization/LocalizedText';
import Toast from './Toast';

import plusImage from '../../icons/plus.svg';

/**
 * Takes the card id and the list of all the id's that are showing
 * and returns whether the description of the specified id is showing.
 * @param {Number} cardID
 * @param {Number[]} showIDs
 * @return {Boolean}
 */
function isDescriptionShowing(cardID, showIDs) {
  for (const id of showIDs) {
    if (cardID === id) {
      return true;
    }
  }
  return false;
}

const categoryTarget = {
  drop(props, monitor) {
    const card = monitor.getItem();
    props.onCardDrop(card.id, card.position, props.id);
  },
};

/**
 *
 * @param {*} connect
 * @param {*} monitor
 * @return {*}
 */
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const Category = ({ id, title, cards, isMinimized,
  onMinimized, onCardClick, showTitleBox,
  onCardDrop, onTitleClick, onTitleChange, onTitleFinish,
  descriptionIDs, connectDropTarget, isOver, errorsTitle, errorsSameCategory, hidingErrorTitle,
  showConfirmPopUp, unSortedConfirmPopUp, state }) => {
  cards = parseCards(cards).cards;
  let classString = 'category';
  if (isOver) {
    classString += ' max-height';
  }
  if (isMinimized) {
    classString += ' minimized';
  }
  return connectDropTarget(
    <li className={classString}>
      <div className="header">
        {
          showTitleBox &&
          <div className="title-input">
            <input autoFocus type='text'
              placeholder={title || L.text.clickToRename}
              defaultValue={title}
              onChange={(e) => onTitleChange(e, id)}
              onKeyPress={(e) => onTitleFinish(e)}
              onClick={(e) => e.stopPropagation()}></input>
            <button type="button" onClick={() => onTitleFinish()}></button>
          </div>
        }
        {
          !showTitleBox &&
          <>
            <h3 onClick={(e) => onTitleClick(e, id)}>
              {title || L.text.clickToRename}</h3>
            <button className="minimize" onClick={(e) =>
              onMinimized(e, isMinimized, id)
            }></button>
          </>
        }

      </div>
      {
        /* Show the 'drop to add to category' */
        isOver &&
        <div className="drop-to-add">
          <img src={plusImage}></img>
          <p>{L.text.dropToAdd}</p>
        </div>
      }
      <ul>{
        cards.map((card) => (
          <CardItem key={card.id} id={card.id} title={card.title}
            description={card.description} minimized={true}
            position={id}
            onClick={(event) => onCardClick(event, card.id, card.description)}
            showDescription={isDescriptionShowing(card.id, descriptionIDs)} />
        ))
      }</ul>
      {
        errorsTitle &&
        <Toast message={L.text.fillTitle} showToast={true} hidingErrorTitle={hidingErrorTitle} />

      }

      {errorsSameCategory &&
        <Toast message={L.text.sameCategoryTitleNotAllowed} showToast={true} hidingErrorTitle={hidingErrorTitle} />

      }
      {
        showConfirmPopUp &&
        <ConfirmPopUp unSorted={unSortedConfirmPopUp} studyID={state.ui.studyID} container={state.container} categories={state.categories} timeStarted={state.ui.timeStarted} comment={state.ui.popup.content} />
      }
    </li>

  );
};

Category.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  cards: PropTypes.array,
  isMinimized: PropTypes.bool.isRequired,
  onMinimized: PropTypes.func.isRequired,
  onCardClick: PropTypes.func,
  showTitleBox: PropTypes.bool,
  onCardDrop: PropTypes.func,
  onTitleClick: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onTitleFinish: PropTypes.func.isRequired,
  descriptionIDs: PropTypes.array,
  errorsTitle: PropTypes.bool,
  errorsSameCategory: PropTypes.bool,
  hidingErrorTitle: PropTypes.func.isRequired,
  showConfirmPopUp: PropTypes.bool,
  unSortedConfirmPopUp: PropTypes.bool,
};

// eslint-disable-next-line new-cap
export default DropTarget(itemTypes.CARD,
  categoryTarget, collect)(Category);
