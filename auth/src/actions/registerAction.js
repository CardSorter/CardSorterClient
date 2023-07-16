import * as StatusEnum from '../static/StatusEnum';
import api from './api';

export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CLEAR_CREDENTIALS = 'CLEAR_CREDENTIALS';
export const CLEAR_USERNAME_ERROR = 'CLEAR_USERNAME_ERROR';
export const CLEAR_PASSWORD_ERROR = 'CLEAR_PASSWORD_ERROR';
export const CLEAR_EMAIL_ERROR = 'CLEAR_EMAIL_ERROR';

export const SENDING_CREDENTIALS = 'SENDING_CREDENTIALS';

/**
 * Changes the username in the register screen.
 * @param {String} username
 * @return {JSON} the action.
 */
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    payload: {
      username: username,
    },
    error: false,
  };
}

/**
 * Changes the password in the register screen.
 * @param {String} password
 * @return {JSON} the action.
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    payload: {
      password: password,
    },
    error: false,
  };
}

/**
 * Changes the email in the register screen.
 * @param {String} email
 * @return {JSON} the action.
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    payload: {
      email: email,
    },
    error: false,
  };
}

/**
 * Clears the credentials of the register page.
 * @return {JSON} the action.
 */
export function clearCredentials() {
  return {
    type: CLEAR_CREDENTIALS,
    payload: {},
    error: false,
  };
}

/**
 * Clears the username error field.
 * @return {JSON} the action.
 */
export function clearUsernameError() {
  return {
    type: CLEAR_USERNAME_ERROR,
    payload: {
    },
    error: false,
  };
}

/**
 * Clears the username error field.
 * @return {JSON} the action.
 */
export function clearPasswordError() {
  return {
    type: CLEAR_PASSWORD_ERROR,
    payload: {
    },
    error: false,
  };
}

/**
 * Clears the email error field.
 * @return {JSON} the action.
 */
export function clearEmailError() {
  return {
    type: CLEAR_EMAIL_ERROR,
    payload: {
    },
    error: false,
  };
}

/**
 * Async function that caries the data send to the server.
 * @param {StatusEnum} status
 * @param {JSON} response
 * @param {Error} error
 * @return {JSON} the action.
 */
export function sendingCredentials(status, response, error) {
  return {
    type: SENDING_CREDENTIALS,
    payload: {
      status: status,
      location: response,
    },
    error: error,
  };
}

/* Thunk actions */

/**
 * Sends the credentials to the server.
 * @param {String} username
 * @param {String} password
 * @param {String} email
 * @return {func}
 */
export function sendCredentials(username, password, email) {
  return function(dispatch) {
    dispatch(sendingCredentials(StatusEnum.IS_SENDING));
    fetch(api+'/user_endpoint?register=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password,
        'email': email,
      }),
    })
        .then(
            (response) => response.json().then((json) => {
              // delete previous auth token
              document.cookie
                = 'auth_token= ;expires = Thu, 01 Jan 1970 00:00:00 GMT';
              // append the new one
              document.cookie = 'auth_token='+json.auth_token+'; path=/';
              dispatch(sendingCredentials(
                  StatusEnum.SUCCESS, json.location, json.error));
            }),
        );
  };
}
