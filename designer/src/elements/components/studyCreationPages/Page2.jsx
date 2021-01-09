// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';
// eslint-disable-next-line no-unused-vars
import Card from './Card.jsx';

const Page2 = ({values, errors, dispatch}) => {
  const addCardsRef = useRef(10);

  return (
    <div className="study-creation-card">
      <h1>{L.text.createStudy}</h1>
      <h2>{L.text.cards}</h2>

      <form className="cards">
        <div className="error-holder">
          <div className="card-container">
            {
              values.cards.map((card) => (
                <Card key={'card'+card.id} name={card.name}
                  description={card.description} onNameChange={(e) =>
                    dispatch.onCardNameChange(card.id, e)}
                  onDescriptionChange={(e) =>
                    dispatch.onCardDescriptionChange(card.id, e)}
                  onDelete = {() => dispatch.onDeleteCard(card.id)}/>
              ))
            }
          </div>
          {
            errors.cards &&
            <div className="error-message"><p>{L.text.fillMeOut}</p></div>
          }
        </div>
        <div className="add-buttons-container">
          <div className="multi-add-container">
            <p>{L.text.add}</p>
            <input defaultValue="10" ref={addCardsRef}></input>
            <p>{L.text.cards}</p>
            <button className="btn-secondary" type="button"
              onClick={() => dispatch.onCreateXCards(addCardsRef)}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"/>
              </svg>
            </button>
          </div>
          <button type="button" className="btn-primary"
            onClick={dispatch.onCreateCard}>
            <span id="plus-icon"></span>
            <p>{L.text.addCard}</p>
          </button>
        </div>
      </form>
      <div className="bottom-container">
        <div className="btn-container">
          <button className="btn-text"
            onClick={dispatch.onPrev}>back</button>
          <button className="btn-contained ml-sm" onClick={() =>
            dispatch.onNext(values.cards)}>next</button>
        </div>
        <div className="page-no-container">
          <p>2</p>
          <p>{L.text.of}</p>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

Page2.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default Page2;
