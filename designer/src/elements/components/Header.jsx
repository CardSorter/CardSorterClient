import React from 'react';
import PropTypes from 'prop-types';

import {studies} from '../../localization/text';

const Header = ({username, profilePic}) => (
  <header>
    <p id="logo">Card Sorter</p>
    <h1>{studies()}</h1>
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
