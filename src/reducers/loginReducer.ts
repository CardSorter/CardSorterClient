/*
--------------------
Template DO NOT EDIT
--------------------
*/

import {createReducer} from '@reduxjs/toolkit';

export interface LoginState {}

const initialState: LoginState = {};

const loginReducer = createReducer(initialState, (builder) => {
  return initialState;
});

export default loginReducer;
