"use client"

import React, {ChangeEvent, KeyboardEvent, useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as LoginActions from "actions/loginAction";
import {useRouter} from "i18n/navigation";
import {useTranslations} from "next-intl";

export default function Page() {
  const router = useRouter();
  const t = useTranslations("LoginPage");

  // State
  const username = useSelector((state: StateSchema) => (state.login.username));
  const password = useSelector((state: StateSchema) => (state.login.password));
  const usernameError = useSelector((state: StateSchema) => (state.login.usernameError));
  const passwordError = useSelector((state: StateSchema) => (state.login.passwordError));
  const authToken = useSelector((state: StateSchema) => state.auth.token);

  // Dispatch
  const dispatch = useDispatch<any>();

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    dispatch(LoginActions.changeUsername({username}));
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(LoginActions.changePassword({password}));
  }

  // TODO: Define the on forgot behaviour
  const onForgot = () => {

  }

  const onLogin = () => {
    dispatch(LoginActions.clearUsernameError());
    dispatch(LoginActions.clearPasswordError());

    dispatch(LoginActions.sendLoginCredentials(username || "", password || ""));
    router.push('/dashboard');
  }

  const onRegister = () => {
    dispatch(LoginActions.clearCredentials());
    router.push("/register");
  }

  const onFormKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      dispatch(LoginActions.clearUsernameError());
      dispatch(LoginActions.clearPasswordError());
      dispatch(LoginActions.sendLoginCredentials(username || "", password || ""));
    }
  }

  // Clear the errors that came on submit after some time
  useEffect(() => {
    if (usernameError) {
      setTimeout(() => dispatch(LoginActions.clearUsernameError()), 5000);
    }

    if (passwordError) {
      setTimeout(() => dispatch(LoginActions.clearPasswordError()), 5000);
    }

  }, [usernameError, passwordError]);

  

  return (
    <div className="auth-page">
      <div className="auth-container">
        <p>{t("login title")}</p>
        <form onKeyUp={onFormKeyPress}>
          <div className="error-holder">
            <input
              type="text"
              className="username"
              onChange={onUsernameChange}
              placeholder={t("username")}
            />
            {usernameError && (
              <div className="error-message">
                <p>{usernameError}</p>
              </div>
            )}
          </div>
          <div className="error-holder">
            <input
              type="password"
              className="password last"
              onChange={onPasswordChange}
              placeholder={t("password")}
            />
            {passwordError && (
              <div className="error-message">
                <p>{passwordError}</p>
              </div>
            )}
          </div>

          <button
            type="button"
            className="reset unavailable"
            onClick={onForgot}
          >
            {t("forgot password")}
          </button>

          <button
            type="button"
            className="action login"
            onClick={onLogin}
          >
            <p>{t("login")}</p>
          </button>
        </form>

        <button className="register" onClick={onRegister}>
          {t("register")}
        </button>
      </div>
    </div>
  );
};