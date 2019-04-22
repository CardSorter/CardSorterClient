// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

import helloImage from '../../icons/hello.svg';
import downArrow from '../../icons/down-arrow-sketch.svg';

const OnBoarding = ({show, onClick}) => {
  if (show) {
    return (
      <div className="on-boarding-screen" onClick={(e) => onClick(e)}>
        <img src={helloImage}></img>
        <h2>Hello!</h2>
        <div className="list-explainer">
          <img src={downArrow} alt="Arrow pointing to the left of the screen"
            className="arrow"></img>
          <span>
            <p>Pick a card and drag it to the right to create a category.</p>
            <p>You can add a card to a category by dropping the card inside of the category.</p>
          </span>
        </div>
        <div className="finish-explainer">
          <img src={downArrow} alt="Arrow pointing to the left of the screen"
            className="arrow"></img>
          <span>
            <p>When you feel like you are done, press the finish button.</p>
          </span>
        </div>
      </div>
    );
  }
  return <span></span>;
};

OnBoarding.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OnBoarding;
