// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

import {itemTypes} from '../../staticContent/dragConstants';
// eslint-disable-next-line no-unused-vars
import CardItem from './CardItem.jsx';
import parseCards from '../../helpers/cardParser';
import L from '../../localization/LocalizedText';

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

const Category = ({id, title, cards, onCardClick, showTitleBox,
  onCardDrop, onTitleClick, onTitleChange, onTitleFinish,
  descriptionIDs, connectDropTarget, isOver}) => {
  cards = parseCards(cards).cards;
  return connectDropTarget(
      <li className={(isOver) ? 'category max-height' : 'category'}>
        {
          showTitleBox &&
          <div className="title-input">
            <input type='text' defaultValue={title}
              onChange={(e)=>onTitleChange(e, id)}
              onKeyPress={(e)=>onTitleFinish(e)}
              onClick={(e)=>e.stopPropagation()}></input>
            <button type="button" onClick={()=>onTitleFinish()}></button>
          </div>
        }
        {
          !showTitleBox &&
          <h3 onClick={(e)=>onTitleClick(e, id)}>{title}</h3>
        }
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
              showDescription={isDescriptionShowing(card.id, descriptionIDs)}/>
          ))
        }</ul>
      </li>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
};

// eslint-disable-next-line new-cap
export default DropTarget(itemTypes.CARD,
    categoryTarget, collect)(Category);
