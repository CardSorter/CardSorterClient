import fetch from 'cross-fetch';
import * as ActionStatus from 'actions/ActionStatus';
import {createAction} from '@reduxjs/toolkit';
import {setAuthToken} from "./authAction";
import { requestingUsername } from "actions/authAction";


export const toggleProfileSettings = createAction<{ toggle: boolean }>("header/toggleProfileSettings");


/* Thunk actions */

/**
 * Fetches the username from the server.
 * @return {(dispatch: Function, getState: Function) => void}
 */
export function fetchUsername(): (dispatch: Function, getState: Function) => void {
  return function (dispatch, getState) {
    dispatch(requestingUsername({status: ActionStatus.IS_FETCHING, username: ''}));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/studies_endpoint?username=true', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: getState().auth.token,
        'Access-Control-Allow-Credentials': 'true',
      },
    }).then((response) =>
      response.json().then((json) => {
        if (response.status !== 401) {
          dispatch(requestingUsername({status: ActionStatus.SUCCESS, username: json.username}));
        } else {
          dispatch(setAuthToken(undefined));
        }
      })
    );
  };
}
