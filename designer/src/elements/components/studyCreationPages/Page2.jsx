// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useSelector } from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';
// eslint-disable-next-line no-unused-vars
import Card from './Card.jsx';

const Page2 = ({ values, errors, dispatch }) => {
  const addCardsRef = useRef(1);
  const [cardCount, setCardCount] = useState(values.cards.length);

  if (localStorage.getItem('cardsDesc') !== null && localStorage.getItem('cardsName') !== null) {
    let cardsName = localStorage.getItem('cardsName').split(',');
    let cardsDesc = localStorage.getItem('cardsDesc').split(',');
    let previousTime;
    for (let i = 0; i < cardsName.length; i++) {
      let time = Date.now();
      while (previousTime === time) {
        time = Date.now();
      }
      setCardCount(cardCount + cardsName.length);

      dispatch.onCreateCard(time);
      dispatch.onLocalStorage(time, cardsName[i], cardsDesc[i]);
      values.cards.push({ id: time, name: cardsName[i], description: cardsDesc[i] });

      previousTime = time;
    }
    localStorage.removeItem('cardsName');
    localStorage.removeItem('cardsDesc');
  }


  return (
    <div className="study-creation-card">
      <h1>{L.text.createStudy}</h1>
      <h2>{L.text.totalCards}{cardCount} </h2>

      <form className="cards">
        <div className="error-holder">
          <div className="card-container">
            {
              values.cards.map((card) => (
                <Card
                  key={'card' + card.id}
                  name={card.name}
                  description={card.description} onNameChange={(e) => {
                    dispatch.onCardNameChange(card.id, e)
                  }}
                  onDescriptionChange={(e) =>
                    dispatch.onCardDescriptionChange(card.id, e)}
                  onDelete={() => {
                    setCardCount(cardCount - 1);
                    dispatch.onDeleteCard(card.id)
                  }
                  } />

              ))
            }
          </div>
          {

            errors.cards &&
            <div className="error-message-cards"><p>{L.text.fillNameFields}</p></div>
          }
          {

            errors.duplicate && (
              <div className="error-message-cards">
                <p>{L.text.areDuplicates}</p>
              </div>
            )}
        </div>
        <div className="add-buttons-container">
          <div className="multi-add-container">
            <p>{L.text.add}</p>
            <input defaultValue="1" ref={addCardsRef}></input>
            <p>{L.text.cards}</p>
            <button className="btn-secondary" type="button"
              onClick={() => {
                if (addCardsRef.current.value >= 1) {
                  setCardCount(cardCount + parseInt(addCardsRef.current.value, 10));
                  dispatch.onCreateXCards(addCardsRef)
                }
              }
              }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="32" height="32">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
          </div>
          {/*
          <button type="button" className="btn-primary"
            onClick={dispatch.onCreateCard}>
            <span id="plus-icon"></span>
            <p>{L.text.addCard}</p>
          </button>
        */}
        </div>
      </form >
      <div className="bottom-container">
        <div className="btn-container">
          <button className="prev"
            onClick={dispatch.onPrev}></button>
          <button className="next" onClick={() => {
            dispatch.onNext(values.cards);
          }
          }>
          </button>
        </div>
        <div className="page-no-container">
          <p>2</p>
          <p>{L.text.of}</p>
          <p>3</p>
        </div>
      </div>
    </div >
  );
};

Page2.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default Page2;
