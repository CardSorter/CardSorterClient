import {createReducer} from "@reduxjs/toolkit";
import * as authAction from "../actions/authAction";

export interface AuthState {
    token: any,
}

const initialState: AuthState = {
    token: null
}

const authReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(authAction.setAuthToken, (state, action) => {
          state.token = action.payload;
      })
})

export default authReducer;