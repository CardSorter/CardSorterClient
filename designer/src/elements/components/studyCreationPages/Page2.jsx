// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';
// eslint-disable-next-line no-unused-vars
import Card from './Card.jsx';

const Page2 = ({values, errors, dispatch}) => {
  const cardContainerRef = useRef(null);

  return (
    <div className="study-creation-card">
      <h1>{L.text.createStudy}</h1>
      <h2>{L.text.cards}</h2>

      <form className="cards">
        <div className="error-holder">
          <div className="card-container" ref={cardContainerRef}>
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
          {
            errors.cards &&
            <div className="error-message"><p>{L.text.fillMeOut}</p></div>
          }
        </div>
        <button type="button" className="btn-primary" onClick={() =>
          dispatch.onCreateCard(cardContainerRef)}>
          <span id="plus-icon"></span>
          <p>{L.text.addCard}</p>
        </button>
      </form>
      <div className="bottom-container">
        <div className="btn-container">
          <button className="prev"
            onClick={dispatch.onPrev}></button>
          <button className="next" onClick={() =>
            dispatch.onNext(values.cards)}></button>
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
