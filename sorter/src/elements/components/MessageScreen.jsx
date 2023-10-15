// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import L from '../../localization/LocalizedText';
const MessageScreen = ({ message, link, renderLink, image, submessage }) => {

  const linkRef = useRef(null);
  return (

    <div className="message-screen" >
      <h1 id="logo"><a href="/">Card Sorter</a></h1>
      <img src={image} alt='Sending love!'></img>
      <h2>{message}</h2>
      <br></br>
      {renderLink &&
        <div className="share-container">
          <p>{L.text.Demographic_Questions}</p>
          <div className="url-container">
            <textarea className="url" ref={linkRef}
              defaultValue={link}></textarea>
            <button className="copy" type="button" onClick={() => {
              linkRef.current.select()
              document.execCommand('copy')
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
