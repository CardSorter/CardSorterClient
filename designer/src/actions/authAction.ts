import { createAction } from '@reduxjs/toolkit'

export const setAuthToken = createAction<string | undefined>("auth/setAuthToken");
