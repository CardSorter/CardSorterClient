import * as loginActions from '../actions/loginAction';
import * as StatusEnum from '../static/StatusEnum';

import L from '../localization/LocalizedText';

/**
 *
 * @param {loginState} state
 * @param {loginAction} action
 * @return {ReduxState} the new (reduced) state.
 */
export default function loginReducer(state={}, action) {
  switch (action.type) {
    case loginActions.CHANGE_USERNAME: {
      return Object.assign({}, state, {
        'username': action.payload.username,
      });
    }
    case loginActions.CHANGE_PASSWORD: {
      return Object.assign({}, state, {
        'password': action.payload.password,
      });
    }
    case loginActions.CLEAR_CREDENTIALS: {
      return Object.assign({}, state, {
        'username': undefined,
        'password': undefined,
      });
    }
    case loginActions.CLEAR_USERNAME_ERROR: {
      return Object.assign({}, state, {
        'usernameError': undefined,
      });
    }
    case loginActions.CLEAR_PASSWORD_ERROR: {
      return Object.assign({}, state, {
        'passwordError': undefined,
      });
    }
    case loginActions.SENDING_CREDENTIALS: {
      const newState = Object.assign({}, state, {
        'isSending': action.payload.status !== StatusEnum.SUCCESS,
      });
      if (action.payload.status === StatusEnum.SUCCESS) {
        if (action.payload.location) {
          // Redirect to main page
          window.location.replace(action.payload.location);
          return newState;
        }
        if (action.error.message === 'USERNAME NOT FOUND') {
          newState.usernameError = L.text.usernameNotFound;
        } else
        if (action.error.message === 'INVALID PASSWORD') {
          newState.passwordError = L.text.wrongPassword;
        } else
        if (action.error.message === 'EMPTY USERNAME') {
          newState.usernameError = L.text.addAnUsername;
        } else
        if (action.error.message === 'EMPTY PASSWORD') {
          newState.passwordError = L.text.addAPassword;
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
