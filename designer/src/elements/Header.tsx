
import React from 'react';
import Image from 'next/image';

import L from 'localization/LocalizedText';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as headerActions from "actions/headerAction";

interface HeaderProps {
  showBackButton?: boolean,
}

const Header = ({showBackButton}: HeaderProps) => {

  // State
  const username = useSelector((state: StateSchema) => state.header.username);
  const profilePic = useSelector((state: StateSchema) => state.header.profilePic);
  const profileUnfold = useSelector((state: StateSchema) => state.header.profileUnfold);

  // Dispatch
  const dispatch = useDispatch();

  const onProfileClick =  (isUnfold: boolean) => {
      dispatch(headerActions.toggleProfileSettings({toggle: !isUnfold}));
    }

  const onLogoutClick = () => {
    dispatch(headerActions.logout());
  }

  return (<header>
    <Link className="logo-container" href='/'>
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
    </Link>
    <div className={(!profileUnfold) ? 'profile' : 'profile unfold'} onClick={() => onProfileClick(profileUnfold)}>
      <div className="header">
        <p>{username}</p>
        <Image src={"/card-sorter/images/sample-user.svg"} alt="Profile Avatar" height={40} width={40}/>
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
