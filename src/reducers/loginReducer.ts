import {createReducer} from '@reduxjs/toolkit';
import * as loginActions from 'actions/loginAction';
import * as ActionStatus from 'actions/ActionStatus';

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

      // TODO: Anti-pattern: state shouldn't hold UI rendered strings
      if (action.payload.status === ActionStatus.SUCCESS) {
        if (action.payload.error === 'USERNAME NOT FOUND') {
            state.usernameError = "This username is already in use";
          } else if (action.payload.error === 'INVALID PASSWORD') {
            state.passwordError = "Wrong password";
          } else if (action.payload.error === 'EMPTY USERNAME') {
            state.usernameError = "Username cannot be empty";
          } else if (action.payload.error === 'EMPTY PASSWORD') {
            state.passwordError = "Password cannot be empty";
          }
      }
    });
});

export default loginReducer;
