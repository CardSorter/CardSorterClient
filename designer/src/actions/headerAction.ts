import fetch from 'cross-fetch';
import api from './api';
import * as ActionStatus from 'actions/ActionStatus';
import {createAction} from '@reduxjs/toolkit';

export const toggleProfileSettings = createAction<{ toggle: boolean }>("header/toggleProfileSettings");

export const logout = createAction("header/logout");

export const requestingUsername = createAction<{ status: string; username: string }>("header/requestingUsername");

/* Thunk actions */

/**
 * Fetches the username from the server.
 * @return {(dispatch: Function, getState: Function) => void}
 */
export function fetchUsername(): (dispatch: Function, getState: Function) => void {
  return function (dispatch, getState) {
    dispatch(requestingUsername({status: ActionStatus.IS_FETCHING, username: ''}));
    fetch(api + '/studies_endpoint?username=true', {
      method: 'GET',
      // withCredentials: true,
      credentials: 'include',
      headers: {
        Authorization: getState().auth.token,
        'Access-Control-Allow-Credentials': 'true',
      },
    }).then((response) =>
      response.json().then((json) => {
        if (response.status !== 401) {
          dispatch(requestingUsername({status: ActionStatus.SUCCESS, username: json.username}));
        }
      })
    );
  };
}
