// eslint-disable-next-line no-unused-vars
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import CardItem from './CardItem.jsx';
import { fetchCards } from '../../actions/cardAction.js';

import { DropTarget } from 'react-dnd';
import { itemTypes } from '../../staticContent/dragConstants';

const listTarget = {
  drop(props, monitor) {
    const card = monitor.getItem();
    props.onDrop(card.id, card.position, props.categories);

  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const List = ({ cards, categories, onDrop, connectDropTarget }) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  cards = cards.cards;
  return connectDropTarget(
    <ul id='list'>
      {
        cards.map((card) => (
          <CardItem key={card.id} id={card.id} title={card.title}
            description={card.description} position={-1}
          />
        ))
      }
    </ul>
  );
};
List.propTypes = {
  cards: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onDrop: PropTypes.func,
};

export default DropTarget(itemTypes.CARD, listTarget, collect)(List);
