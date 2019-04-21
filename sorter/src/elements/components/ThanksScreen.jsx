// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropsTypes from 'prop-types';

import thanksImage from '../../icons/thanks-icon.svg';

const ThanksScreen = ({message}) => (
  <div className="thanks-screen">
    <h1 id="logo">Card Sorter</h1>
    <img src={thanksImage} alt='Sending love!'></img>
    <h2>{message}</h2>
  </div>
);

ThanksScreen.PropsTypes = {
  message: PropsTypes.string.isRequired,
};

export default ThanksScreen;
