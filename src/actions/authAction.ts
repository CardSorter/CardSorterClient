import { createAction } from '@reduxjs/toolkit'

export const setAuthToken = createAction<string | undefined>("auth/setAuthToken");
export const setAuthUsername = createAction<string>("auth/setAuthUsername");
export const logout = createAction("auth/logout");
