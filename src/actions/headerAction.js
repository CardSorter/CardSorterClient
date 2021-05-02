import fetch from 'cross-fetch';
import api from './api';
import auth from '../auth/authenticator';
import * as StatusEnum from '../static/StatusEnum';

export const TOGGLE_PROFILE_SETTINGS = 'SHOW_PROFILE_SETTINGS';
export const REQUEST_USERNAME = 'REQUEST_USERNAME';
export const LOGOUT = 'LOGOUT';

/**
 * Shows the user profile setting. Flags the settings to be unfolded.
 * @param {Boolean} toggle
 */
export function toggleProfileSettings(toggle) {
  return {
    type: TOGGLE_PROFILE_SETTINGS,
    payload: {
      toggle: toggle,
    },
    error: false,
  };
}

/**
 * Performs the logout of the user by deleting the auth token.
 */
export function logout() {
  return {
    type: LOGOUT,
    payload: {
    },
    error: false,
  };
}

/**
 * Async action that requests the current username (based on the jws token).
 * @param {StatusEnum} status
 * @param {String} username
 * @param {Error} error
 */
export function requestingUsername(status, username, error) {
  return {
    type: REQUEST_USERNAME,
    payload: {
      status: status,
      username: username,
    },
    error: false,
  };
}

/* Thunk actions */

/**
 * Fetches the username from the server.
 * @return {func}
 */
export function fetchUsername() {
  return function(dispatch) {
    dispatch(requestingUsername(StatusEnum.IS_FETCHING));
    fetch(api+'/studies_endpoint?username=true', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': auth.getToken(),
        'Access-Control-Allow-Credentials': true,
      },
    })
        .then(
            (response) => response.json().then((json) => {
              if (response.status !== 401) {
                dispatch(requestingUsername(StatusEnum.SUCCESS, json.username));
              }
            }
            )
        );
  };
}
