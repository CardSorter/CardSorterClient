import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';

const Board = ({categories, onClick, onCardClick, descriptionID}) => {
  categories = categories.map((category) => (
    <CategoryItem key={'k' + category.id} title={category.title}
      cards={category.cards} onClick={onCardClick}
      descriptionID={descriptionID}/>
  ));

  return (<ul id='board' onClick={onClick}>
    {
      categories
    }
  </ul>);
};

// TODO
// Board.protoTypes = {
//   cards: PropTypes.arrayOf(
//   )
// }

export default Board;
