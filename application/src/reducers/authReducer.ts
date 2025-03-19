import {createReducer} from "@reduxjs/toolkit";
import * as authAction from "../actions/authAction";
import {clearPersistedState} from "../Store";

export interface AuthState {
  token: string | undefined,
}

const initialState: AuthState = {
  token: undefined,
}

const authReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(authAction.setAuthToken, (state, action) => {
        state.token = action.payload;
      })
      .addCase(authAction.logout, (state, action) => {
        state.token = undefined;
        clearPersistedState();
      })
})

export default authReducer;