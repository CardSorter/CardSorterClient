import {createReducer} from '@reduxjs/toolkit';
import * as headerActions from '../actions/headerAction';
import * as ActionStatus from 'actions/ActionStatus';

export interface HeaderState {
  username?: string,
  profilePic?: string,
  profileUnfold: boolean,
}

const initialState: HeaderState = {
  profileUnfold: false,
};

const headerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(headerActions.toggleProfileSettings, (state, action) => {
      state.profileUnfold = action.payload?.toggle || false;
    })
    .addCase(headerActions.logout, (state) => {
      let redirectUrl = '/auth/';
      if (process.env.NODE_ENV === 'production') {
        redirectUrl = '/card-sorter/auth/';
      }
      // Delete the auth token
      document.cookie = 'auth_token= ;expires = Thu, 01 Jan 1970 00:00:00 GMT';
      // Redirect to the main page
      document.location.replace(redirectUrl);
    })
    .addCase(headerActions.requestingUsername, (state, action) => {
      state.username = action.payload?.status === ActionStatus.SUCCESS ? action.payload.username : '';
    });
});

export default headerReducer;
