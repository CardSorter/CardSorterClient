"use client"
import React, {ChangeEvent, KeyboardEvent, useEffect} from 'react';

import L from 'localization/LocalizedText';
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as registerActions from "actions/registerAction";
import {useRouter} from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();

  // State
  const username = useSelector((state: StateSchema) => (state.register.username));
  const password = useSelector((state: StateSchema) => (state.register.password));
  const email = useSelector((state: StateSchema) => (state.register.email));
  const usernameError = useSelector((state: StateSchema) => (state.register.usernameError));
  const passwordError = useSelector((state: StateSchema) => (state.register.passwordError));
  const emailError = useSelector((state: StateSchema) => (state.register.emailError));

  // Dispatch
  const dispatch = useDispatch<any>();

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    dispatch(registerActions.clearUsernameError());
    dispatch(registerActions.changeUsername({username}));
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(registerActions.clearPasswordError());
    dispatch(registerActions.changePassword({password}));
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    dispatch(registerActions.clearEmailError());
    dispatch(registerActions.changeEmail({email}));
  }

  const onSignUp = () => {
    dispatch(registerActions.clearUsernameError());
    dispatch(registerActions.clearPasswordError());
    dispatch(registerActions.clearEmailError());
    dispatch(registerActions.sendRegisterCredentials(username || "", password || "", email || ""));
  }

  const onBack = () => {
    dispatch(registerActions.clearCredentials());
    router.push('/login');
  }

  const onFormKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      dispatch(registerActions.clearUsernameError());
      dispatch(registerActions.clearPasswordError());
      dispatch(registerActions.clearEmailError());
      dispatch(registerActions.sendRegisterCredentials(username || "", password || "", email || ""));
    }
  }

  useEffect(() => {
    if (usernameError) {
      setTimeout(() => dispatch(registerActions.clearUsernameError()), 5000);
    }

    if (passwordError) {
      setTimeout(() => dispatch(registerActions.clearPasswordError()), 5000);
    }

    if (emailError) {
      setTimeout(() => dispatch(registerActions.clearEmailError()), 5000);
    }

  }, [emailError, passwordError, usernameError]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <p>{L?.text?.hiThere}</p>
        <button className="back" onClick={onBack}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <form onKeyUp={onFormKeyPress}>
          <div className="error-holder">
            <input
              type="text"
              className="username"
              onChange={onUsernameChange}
              placeholder={L?.text?.username}
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
              className="password"
              onChange={onPasswordChange}
              placeholder={L?.text?.password}
            />
            {passwordError && (
              <div className="error-message">
                <p>{passwordError}</p>
              </div>
            )}
          </div>

          <div className="error-holder">
            <input
              type="email"
              className="email last"
              onChange={onEmailChange}
              placeholder={L?.text?.email}
            />
            {emailError && (
              <div className="error-message">
                <p>{emailError}</p>
              </div>
            )}
          </div>
          <button
            type="button"
            className="action signup"
            onClick={onSignUp}
          >
            <p>{L?.text?.signUp}</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
