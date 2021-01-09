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
  const style = (!profileUnfold) ? 'profile' : 'profile unfold';

  return (<header>
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

    <div className={style} onClick={() => onProfileClick(profileUnfold)}>
      <div className="header">
        <p>{username}</p>
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

export default Header;
