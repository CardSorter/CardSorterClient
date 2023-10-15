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

    //props.removeEmptyCategories(props.categories);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const List = ({ cards, categories, onDrop, connectDropTarget }) => {
  // const [cardsList, setCardsList] = useState();

  //alert(JSON.stringify(cardsList));
  //alert('cards: ' + JSON.stringify(cards));
  // alert('localStorage: ' + JSON.stringify(window.localStorage.getItem('LIST_STATE')));

  // useEffect(() => {
  //   const data = window.localStorage.getItem('LIST_STATE');
  //   if (data !== null) {
  //     setCardsList([...JSON.parse(data)]);
  //   }

  // }, [cards]);


  // useEffect(() => {
  //   window.localStorage.setItem('LIST_STATE', JSON.stringify(cards));
  //   // setCardsList([...cards]);

  // }, [cards]);

  // useEffect(() => {

  //   const data = window.localStorage.getItem('LIST_STATE');
  //   setCardsList(JSON.parse(data));
  //   alert(cardsList + data)
  // }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('LIST_STATE', JSON.stringify(cards));
  // }, [cards]);

  const handleUnload = (event) => {
    console.log("UNLOADING");
    return (event.returnValue = "");

  };
  //cards = JSON.stringify(cards);
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
//export default List;