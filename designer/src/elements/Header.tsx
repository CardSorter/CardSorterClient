"use client"

import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import L from 'localization/LocalizedText';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as headerActions from "actions/headerAction";
import * as authActions from "actions/authAction";
import {usePathname} from "next/navigation";

const Header = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const pathname = usePathname();

  // State
  const username = useSelector((state: StateSchema) => state.header.username);
  const profilePic = useSelector((state: StateSchema) => state.header.profilePic);
  const profileUnfold = useSelector((state: StateSchema) => state.header.profileUnfold);

  // Dispatch
  const dispatch = useDispatch();

  const onProfileClick = (isUnfold: boolean) => {
    dispatch(headerActions.toggleProfileSettings({toggle: !isUnfold}));
  }

  const onLogoutClick = () => {
    dispatch(authActions.logout());
  }

  // Figure out which items to render
  useEffect(() => {
    if (pathname.includes('login') || pathname.includes("register")) {
      setShowProfileSettings(false);
    } else {
      setShowProfileSettings(true);
    }
  }, [pathname])

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
    {
      showProfileSettings &&
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
    }

  </header>);
};


export default Header;
