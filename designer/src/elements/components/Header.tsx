
import React from 'react';
import Image from 'next/image';

import L from '../../localization/LocalizedText';

interface HeaderProps {
  username: string,
  profilePic: string,
  showBackButton: boolean,
  profileUnfold: boolean,
  onProfileClick: (state: boolean) => void,
  onLogoutClick: () => void,
}

const Header = ({ username, profilePic, showBackButton, profileUnfold,
  onProfileClick, onLogoutClick }: HeaderProps) => {
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
          <span className="content">{L?.text?.toFront}</span>
        </button>
      }
    </a>
    <div className={style} onClick={() => onProfileClick(profileUnfold)}>
      <div className="header">
        <p>{username}</p>
        <Image src={"/images/sample-user.svg"} alt="Profile Avatar" height={40} width={40}/>
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
