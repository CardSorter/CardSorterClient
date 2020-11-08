// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const MessageScreen = ({message, image, submessage}) => (
  <div className="message-screen">
    <h1 id="logo"><a href="/">Card Sorter</a></h1>
    <img src={image} alt='Sending love!'></img>
    <h2>{message}</h2>
    <h3>{submessage}</h3>
  </div>
);

MessageScreen.propTypes = {
  message: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  submessage: PropTypes.string,
};

export default MessageScreen;
