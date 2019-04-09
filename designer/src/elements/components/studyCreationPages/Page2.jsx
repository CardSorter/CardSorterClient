import React from 'react';
import PropTypes from 'prop-types';

import {createStudy, cards, description, cardName, addCard, of}
  from '../../../localization/text';

const Page2 = ({defaultProps}) => (
  <div className="study-creation-card">
    <h1>{createStudy()}</h1>
    <h2>{cards()}</h2>

    <form className="cards">
      <div className="card-container">
        <div className="card">
          <input type="text" placeholder={cardName()}></input>
          <input type="text" placeholder={description()}></input>
        </div>
      </div>
      <button>{addCard()}</button>
    </form>
    <div className="bottom-container">
      <div className="btn-container">
        <button className="prev"
          onClick={defaultProps().onNext}></button>
        <button className="next" onClick={defaultProps().onPrev}></button>
      </div>
      <div className="page-no-container">
        <p>2</p>
        <p>{of()}</p>
        <p>3</p>
      </div>
    </div>
  </div>
);

export default Page2;
