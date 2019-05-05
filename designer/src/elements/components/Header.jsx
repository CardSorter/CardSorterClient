// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import demoImage from '../../icons/sample-user.svg';
import L from '../../localization/LocalizedText';

const Header = ({username, profilePic, showBackButton}) => {
  return (<header>
    <a className="logo-container" href="/">
      <a href="/" id="logo">Card Sorter</a>
      {
        showBackButton &&
        <button id="back">
          <span className="arrow">
            <span className="shaft"></span>
          </span>
          <span className="content">{L.text.toFront}</span>
        </button>
      }
    </a>
    <div className="profile">
      <p>{username}</p>
      <img src={demoImage} alt='Profile' />
    </div>
  </header>);
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool.isRequired,
};

export default Header;
