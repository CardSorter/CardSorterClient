import {createReducer} from "@reduxjs/toolkit";
import * as authAction from "../actions/authAction";
import {clearPersistedState} from "../Store";
import * as ActionStatus from "actions/ActionStatus";


export interface AuthState {
  token: string | undefined,
  username?: string;
}

const initialState: AuthState = {
  token: undefined,
  username: undefined,
}

const authReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(authAction.setAuthToken, (state, action) => {
        state.token = action.payload;
      })
      .addCase(authAction.setAuthUsername, (state, action) => {
        state.username = action.payload;
      })
      .addCase(authAction.logout, (state, action) => {
        state.token = undefined;
        state.username = undefined;
        clearPersistedState();
      })
      .addCase(authAction.requestingUsername, (state, action) => {
      state.username = action.payload?.status === ActionStatus.SUCCESS ? action.payload.username : '';
      });
      
      

})

export default authReducer;