import {createReducer} from '@reduxjs/toolkit';
import * as headerActions from '../actions/headerAction';
import * as ActionStatus from 'actions/ActionStatus';

export interface HeaderState {
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
    
});

export default headerReducer;
