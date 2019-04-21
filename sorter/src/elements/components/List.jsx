import React from 'react';
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

// TODO
// Container.protoTypes = {
//   cards: PropTypes.arrayOf(
//   )
// }

export default List;
