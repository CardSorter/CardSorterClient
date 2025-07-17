import {createReducer} from '@reduxjs/toolkit';
import * as settingsActions from 'actions/settingsAction';
import * as ActionStatus from 'actions/ActionStatus';

import {
    changeUsername,
    changeNewUsername,
    changePassword,
    changeNewPassword,
    changeEmail,
    changeNewEmail,
    saveSettings,
    clearCredentials
  } from "actions/settingsAction";

export interface SettingsState{
    username?: string;
    newUsername?: string;
    newPassword?: string;
    email?: string;
    newEmail?: string;
}

const initialState: SettingsState = {
    username: "",
    email: "",
    newUsername: "",
    newPassword: "",
    newEmail: "",
};

const settingsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(changeUsername, (state, action) => {
        state.username = action.payload.username;
      })
      .addCase(changeNewUsername, (state, action) => {
        state.newUsername = action.payload.username;
      })
      
      .addCase(changeNewPassword, (state, action) => {
        state.newPassword = action.payload.password;
      })
      .addCase(changeEmail, (state, action) => {
        state.email = action.payload.email;
      })
      .addCase(changeNewEmail, (state, action) => {
        state.newEmail = action.payload.email;
      })
      
      .addCase(clearCredentials, (state) => {
        state.newUsername = undefined;
        state.newPassword = undefined;
        state.newEmail = undefined;
      })
  });
  
  export default settingsReducer;