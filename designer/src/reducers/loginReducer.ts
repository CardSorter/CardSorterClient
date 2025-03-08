import {createReducer} from '@reduxjs/toolkit';
import * as loginActions from 'actions/loginAction';
import * as ActionStatus from 'actions/ActionStatus';

import L from 'localization/LocalizedText';

export interface LoginState {
  username?: string;
  password?: string;
  usernameError?: string;
  passwordError?: string;
  isSending?: boolean;
}

const initialState: LoginState = {};

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginActions.changeUsername, (state, action) => {
      state.username = action.payload.username;
    })
    .addCase(loginActions.changePassword, (state, action) => {
      state.password = action.payload.password;
    })
    .addCase(loginActions.clearCredentials, (state) => {
      state.username = undefined;
      state.password = undefined;
    })
    .addCase(loginActions.clearUsernameError, (state) => {
      state.usernameError = undefined;
    })
    .addCase(loginActions.clearPasswordError, (state) => {
      state.passwordError = undefined;
    })
    .addCase(loginActions.sendingCredentials, (state, action) => {
      state.isSending = action.payload.status !== ActionStatus.SUCCESS;

      if (action.payload.status === ActionStatus.SUCCESS) {
        if (action.payload.error === 'USERNAME NOT FOUND') {
            state.usernameError = L?.text?.usernameNotFound;
          } else if (action.payload.error === 'INVALID PASSWORD') {
            state.passwordError = L?.text?.wrongPassword;
          } else if (action.payload.error === 'EMPTY USERNAME') {
            state.usernameError = L?.text?.addAnUsername;
          } else if (action.payload.error === 'EMPTY PASSWORD') {
            state.passwordError = L?.text?.addAPassword;
          }
      }
    });
});

export default loginReducer;
