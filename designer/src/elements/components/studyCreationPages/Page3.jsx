import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../../localization/LocalizedText';

const Page3 = ({defaultProps}) => (
  <div className="study-creation-card">
    <h1>{localizedText.text.createStudy}</h1>
    <h2>{localizedText.text.cards}</h2>


    <div className="bottom-container">
      <div className="btn-container">
        <button className="prev"
          onClick={defaultProps().onNext}></button>
        <button className="next" onClick={defaultProps().onPrev}></button>
      </div>
      <div className="page-no-container">
        <p>3</p>
        <p>{localizedText.text.of}</p>
        <p>3</p>
      </div>
    </div>
  </div>
);

export default Page3;
