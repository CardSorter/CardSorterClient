import fetch from 'cross-fetch';
import api from './api';
import auth from '../auth/authenticator';
import * as StatusEnum from '../static/StatusEnum';

export const REQUEST_USERNAME = 'REQUEST_USERNAME';

/**
 * Async action that requests the current username (based on the jws token).
 * @param {StatusEnum} status
 * @param {String} username
 * @param {Error} error
 * @return {JSON} the action.
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
