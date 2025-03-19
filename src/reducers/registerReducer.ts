import {createReducer} from '@reduxjs/toolkit';
import * as registerActions from 'actions/registerAction';
import * as ActionStatus from 'actions/ActionStatus';


export interface RegisterState {
  username?: string;
  password?: string;
  email?: string;
  usernameError?: string;
  passwordError?: string;
  emailError?: string;
  isSending?: boolean;
}

const initialState: RegisterState = {};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(registerActions.changeUsername, (state, action) => {
      state.username = action.payload.username;
    })
    .addCase(registerActions.changePassword, (state, action) => {
      state.password = action.payload.password;
    })
    .addCase(registerActions.changeEmail, (state, action) => {
      state.email = action.payload.email;
    })
    .addCase(registerActions.clearCredentials, (state) => {
      state.username = undefined;
      state.password = undefined;
      state.email = undefined;
    })
    .addCase(registerActions.clearUsernameError, (state) => {
      state.usernameError = undefined;
    })
    .addCase(registerActions.clearPasswordError, (state) => {
      state.passwordError = undefined;
    })
    .addCase(registerActions.clearEmailError, (state) => {
      state.emailError = undefined;
    })
    .addCase(registerActions.sendingCredentials, (state, action) => {
      state.isSending = action.payload.status !== ActionStatus.SUCCESS;

      // TODO: Anti-pattern: state shouldn't hold UI rendered strings
      if (action.payload.status === ActionStatus.SUCCESS) {
        if (action.payload.error === 'DUPLICATE USERNAME') {
          state.usernameError = "This username is already in use";
        } else if (action.payload.error === 'DUPLICATE EMAIL') {
          state.emailError = "This email is already in use";
        } else if (action.payload.error === 'EMPTY USERNAME') {
          state.usernameError = "Username cannot be empty";
        } else if (action.payload.error === 'EMPTY PASSWORD') {
          state.passwordError = "Password cannot be empty";
        } else if (action.payload.error === 'EMPTY EMAIL') {
          state.emailError = "Email cannot be empty";
        }
      }
    });
});
