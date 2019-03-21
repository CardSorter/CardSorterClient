import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem.jsx';

const Container = ({cards}) => (
  <ul id='container'>
    {
      cards.map((card) => (
        <CardItem key={card.id} id={card.id} title={card.title}
          description={card.description} position={-1} />
      ))
    }
  </ul>
);

// TODO
// Container.protoTypes = {
//   cards: PropTypes.arrayOf(
//   )
// }

export default Container;
