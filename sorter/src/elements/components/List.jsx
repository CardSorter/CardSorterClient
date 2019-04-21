// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import CardItem from './CardItem.jsx';

const List = ({cards}) => (
  <ul id='container'>
    {
      cards.map((card) => (
        <CardItem key={card.id} id={card.id} title={card.title}
          description={card.description} position={-1} />
      ))
    }
  </ul>
);

List.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default List;
