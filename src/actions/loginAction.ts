import {createAction} from '@reduxjs/toolkit';
import fetch from 'cross-fetch';
import * as ActionStatus from 'actions/ActionStatus';
import {setAuthToken} from "./authAction";
import * as authAction from 'actions/authAction';

export const changeUsername = createAction<{ username: string }>('login/changeUsername');
export const changePassword = createAction<{ password: string }>('login/changePassword');
export const clearCredentials = createAction('login/clearCredentials');
export const clearUsernameError = createAction('login/clearUsernameError');
export const clearPasswordError = createAction('login/clearPasswordError');
export const sendingCredentials = createAction<{
  status: string;
  error?: string;
}>('login/sendingCredentials');

/* Thunk actions */

/**
 * Sends the credentials to the server.
 */
export function sendLoginCredentials(username: string, password: string) {
  return function (dispatch: (action: any) => void): void {
    dispatch(sendingCredentials({status: ActionStatus.IS_FETCHING}));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/user_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) =>
        response.json().then((json) => {
          
          dispatch(setAuthToken(json.auth_token));
          if (json.auth_token) {
            localStorage.setItem("authToken", json.auth_token);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_endpoint`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${json.auth_token}`,
              },
            })
            .then(profileResponse => profileResponse.json())
            .then(profileData => {
              if (profileData.username) {
                dispatch(authAction.setAuthUsername(profileData.username));
              }
            })
            .catch(error => {
              console.error("Failed to fetch profile:", error);
            });
          }
          dispatch(
            sendingCredentials({
              status: ActionStatus.SUCCESS,
              error: json.error?.message,
            })
          );
        })
      );
  };
}
