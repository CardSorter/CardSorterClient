export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CLEAR_CREDENTIALS = 'CLEAR_CREDENTIALS';

/**
 * Changes the username in the login screen.
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
 * Changes the password in the login screen.
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
 * Clears the credentials of the login page.
 * @return {JSON} the action.
 */
export function clearCredentials() {
  return {
    type: CLEAR_CREDENTIALS,
    payload: {},
    error: false,
  };
}
