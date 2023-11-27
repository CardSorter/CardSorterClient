// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import demoImage from '../../icons/sample-user.svg';
import L from '../../localization/LocalizedText';

const Header = ({ username, profilePic, showBackButton, profileUnfold,
  onProfileClick, onLogoutClick }) => {
  const style = (!profileUnfold) ? 'profile' : 'profile unfold';

  let redirectUrl = '/';
  if (process.env.NODE_ENV === 'production') {
    redirectUrl = '/card-sorter/';
  }
  return (<header>
    <a className="logo-container" href={redirectUrl}>
      <p id="logo">Card Sorter</p>
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
    <div className={style} onClick={() => onProfileClick(profileUnfold)}>
      <div className="header">
        <p>{username}</p>
        <img src={demoImage} alt='Profile' />
      </div>
      {
        profileUnfold &&
        <div className="content">
          <button className="unfunctional">Settings</button>
          <button onClick={onLogoutClick}>Log out</button>
        </div>
      }
    </div>
  </header>);
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool.isRequired,
};

export default Header;
