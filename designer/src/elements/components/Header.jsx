import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../localization/LocalizedText';

const Header = ({username, profilePic}) => (
  <header>
    <p id="logo">Card Sorter</p>
    <h1>{localizedText.text.studies}</h1>
    <div className="profile">
      <p>{username}</p>
      <img src={profilePic} alt='Profile' />
    </div>
  </header>
);

Header.propTypes = {
  username: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
};


export default Header;
