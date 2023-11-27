// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import L from '../../localization/LocalizedText';
const MessageScreen = ({ message, link, renderLink, image, submessage }) => {
  if (renderLink) {
    link = link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;
  }

  return (

    <div className="message-screen" >
      <h1 id="logo"><a href="/">Card Sorter</a></h1>
      <img src={image} alt='Sending love!'></img>
      <h2>{message}</h2>
      <br></br>
      {renderLink &&
        <div className="share-container">
          <p>{L.text.Questionnaire}</p>
          <div className="url-container">
            <a className="url" href={link} target="_blank">{link}</a>

            <button className="copy" type="button" onClick={() => {
              const input = document.createElement('input');
              input.value = link;
              document.body.appendChild(input);
              input.select();
              document.execCommand('copy');
              document.body.removeChild(input);
            }}
            ></button>
          </div>
        </div>
      }

      <br></br>
      <h3>{submessage}</h3>
    </div >
  );
};

MessageScreen.propTypes = {
  message: PropTypes.string.isRequired,
  link: PropTypes.string,
  image: PropTypes.string.isRequired,
  submessage: PropTypes.string,
};

export default MessageScreen;
