export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CLEAR_CREDENTIALS = 'CLEAR_CREDENTIALS';

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
