import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem.jsx';
import parseCards from '../../helpers/cardParser';

const CategoryItem = ({title, cards, onClick, descriptionID}) => {
  cards = parseCards(cards).cards;
  return (<li className='category'>
    <h3>{title}</h3>
    <ul>{
      cards.map((card) => (
        <CardItem key={card.id} title={card.title}
          description={card.description} minimized={true}
          onClick={(event) => onClick(event, card.id)}
          showDescription={card.id===descriptionID}/>
      ))
    }</ul>
  </li>);
};

CategoryItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategoryItem;
