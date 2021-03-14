import React from 'react';


import L from '../../localization/LocalizedText';
import CreateStudyItem from "./CreateStudyItem";

export interface HeaderState {
  username: string,
  showBackButton: boolean,
  profileUnfold: boolean,
}

export interface HeaderDispatch {
  onProfileClick: (b: boolean) => {},
  onLogoutClick: () => {},
}

const Header: React.FC<HeaderState & HeaderDispatch> = ({username, showBackButton,
                                                          profileUnfold, onProfileClick, onLogoutClick}) => {

  return (
    <header>
      <a className="logo-container" href="/">
        <p id="logo">Card Sorter</p>
        {
          showBackButton &&
          <button id="back">
            <span className="arrow">
              <span className="shaft"/>
            </span>
            <span className="content">{L.text && L.text.toFront}</span>
          </button>
        }
      </a>
      <CreateStudyItem />

      <div className={(!profileUnfold) ? 'profile' : 'profile unfold'} onClick={() => onProfileClick(profileUnfold)}>
        <p className="header">{username}</p>

        {
          profileUnfold &&
            <ul className="content">
              <li><button className="unfunctional">Settings</button></li>
              <li><button onClick={onLogoutClick}>Log out</button></li>
            </ul>
        }
      </div>
    </header>
  );
};

export default Header;
