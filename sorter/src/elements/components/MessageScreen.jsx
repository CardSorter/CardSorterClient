// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const MessageScreen = ({message, image}) => (
  <div className="message-screen">
    <h1 id="logo">Card Sorter</h1>
    <img src={image} alt='Sending love!'></img>
    <h2>{message}</h2>
  </div>
);

MessageScreen.propTypes = {
  message: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default MessageScreen;
