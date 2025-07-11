/*
--------------------
Template DO NOT EDIT
--------------------
*/

import {createReducer} from "@reduxjs/toolkit";


export interface AuthState {
  token: string | undefined,
  username?: string;
}

const initialState: AuthState = {
  token: "dev",
  username: "developer",
}

const authReducer = createReducer(initialState, (builder) => {
    return initialState;
})

export default authReducer;