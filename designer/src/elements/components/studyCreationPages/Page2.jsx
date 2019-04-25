// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../../localization/LocalizedText';
// eslint-disable-next-line no-unused-vars
import Card from './Card.jsx';

const Page2 = ({values, dispatch}) => (
  <div className="study-creation-card">
    <h1>{localizedText.text.createStudy}</h1>
    <h2>{localizedText.text.cards}</h2>

    <form className="cards">
      <div className="card-container">
        {
          values.cards.map((card) => (
            <Card key={'card'+card.id} name={card.name}
              description={card.description} onNameChange={(e) =>
                dispatch.onCardNameChange(card.id, e)}
              onDescriptionChange={(e) =>
                dispatch.onCardDescriptionChange(card.id, e)}/>
          ))
        }
      </div>
      <button type="button" onClick={dispatch.onCreateCard}>
        {localizedText.text.addCard}</button>
    </form>
    <div className="bottom-container">
      <div className="btn-container">
        <button className="prev"
          onClick={dispatch.onPrev}></button>
        <button className="next" onClick={dispatch.onNext}></button>
      </div>
      <div className="page-no-container">
        <p>2</p>
        <p>{localizedText.text.of}</p>
        <p>3</p>
      </div>
    </div>
  </div>
);

Page2.propTypes = {
  values: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default Page2;
