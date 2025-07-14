"use client"

import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as headerActions from "actions/headerAction";
import * as authActions from "actions/authAction";
import {Link, usePathname} from "i18n/navigation";
import {useTranslations} from "next-intl";
import { useRouter } from 'i18n/navigation';
import styles from "./Header.module.scss";

const Header = () => {
  const t = useTranslations("Header");
  const router = useRouter();

  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const pathname = usePathname();

  // State
  const username = useSelector((state: StateSchema) => state.auth.username); /*have the same as in authReducer so it will be updated dynamically */
  const authToken = useSelector((state: StateSchema) => state.auth.token);
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

  return (
    <header className={styles.header}>
    {
      authToken &&
        <Link className={styles.logoContainer} href='/dashboard'>
          <p className={styles.logo}>Card Sorter</p>
        </Link>
    }

    {
      !authToken &&
        <Link className={styles.logoContainer} href='/client/public'>
          <p className={styles.logo}>Card Sorter</p>
        </Link>
    }

    {
      showProfileSettings &&
        <div className={(!profileUnfold) ? styles.profile : `${styles.profile} ${styles.unfold}`} onClick={() => onProfileClick(profileUnfold)}>
          <div className={styles.profileHeader}>
            <p>{username}</p>
            <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
          </div>
          {
            profileUnfold &&
              <div className={styles.content}>
                  <button onClick={() => router.push('/settings')}>{t("settings")}</button>
                  <button onClick={onLogoutClick}>{t("log out")}</button>
              </div>
          }
        </div>
    }

  </header>);
};


export default Header;
