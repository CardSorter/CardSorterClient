"use client"

import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as headerActions from "actions/headerAction";
import * as authActions from "actions/authAction";
import {Link, usePathname} from "i18n/navigation";
import {useTranslations} from "next-intl";
import { useRouter } from 'i18n/navigation';

const Header = () => {
  const t = useTranslations("Header");
  const router = useRouter();

  const [showBackButton, setShowBackButton] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const pathname = usePathname();

  // State
  const username = useSelector((state: StateSchema) => state.auth.username); /*have the same as in authReducer so it will be updated dynamically */
  const profilePic = useSelector((state: StateSchema) => state.header.profilePic);
  const profileUnfold = useSelector((state: StateSchema) => state.header.profileUnfold);

  // Dispatch
  const dispatch = useDispatch();

  const onProfileClick = (isUnfold: boolean) => {
    dispatch(headerActions.toggleProfileSettings({toggle: !isUnfold}));
  }

  const onLogoutClick = () => {
    dispatch(authActions.logout());
    router.push('/login');
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
    <Link className="logo-container" href='/dashboard'>
      <p id="logo">Card Sorter</p>
      {
        showBackButton &&
          <button id="back">
          <span className="arrow">
            <span className="shaft"></span>
          </span>
              <span className="content">{t("to front")}</span>
          </button>
      }
    </Link>
    {
      showProfileSettings &&
        <div className={(!profileUnfold) ? 'profile' : 'profile unfold'} onClick={() => onProfileClick(profileUnfold)}>
          <div className="header">
            <p>{username}</p>
            <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
          </div>
          {
            profileUnfold &&
              <div className="content">
                  <button onClick={() => router.push('/settings')}>{t("settings")}</button>
                  <button onClick={onLogoutClick}>{t("log out")}</button>
              </div>
          }
        </div>
    }

  </header>);
};


export default Header;
