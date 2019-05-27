// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import ShareBox from '../containers/ShareBoxContainer.jsx';

const Popup = ({title, icon, iconAlt, url, close}) => {
  return (
    <div className="popup-container" onClick={close}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          {
            icon &&
            <img src={icon} alt={iconAlt}></img>
          }
          <h2>{title}</h2>
          <button className="close-btn" onClick={close}>&#10005;</button>
        </div>
        <div className="content">
          {
            url &&
            <ShareBox url={url}/>
          }
        </div>
      </div>
    </div>);
};

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconAlt: PropTypes.string,
  url: PropTypes.string,
  close: PropTypes.func.isRequired,
};

export default Popup;


