import * as registerActions from '../actions/registerAction';
import * as StatusEnum from '../static/StatusEnum';

import L from '../localization/LocalizedText';

/**
 *
 * @param {registerState} state
 * @param {registerAction} action
 * @return {ReduxState} the new (reduced) state.
 */
export default function registerReducer(state={}, action) {
  switch (action.type) {
    case registerActions.CHANGE_USERNAME: {
      return Object.assign({}, state, {
        'username': action.payload.username,
      });
    }
    case registerActions.CHANGE_PASSWORD: {
      return Object.assign({}, state, {
        'password': action.payload.password,
      });
    }
    case registerActions.CHANGE_EMAIL: {
      return Object.assign({}, state, {
        'email': action.payload.email,
      });
    }
    case registerActions.CLEAR_CREDENTIALS: {
      return Object.assign({}, state, {
        'username': undefined,
        'password': undefined,
        'email': undefined,
      });
    }
    case registerActions.CLEAR_USERNAME_ERROR: {
      return Object.assign({}, state, {
        'usernameError': undefined,
      });
    }
    case registerActions.CLEAR_PASSWORD_ERROR: {
      return Object.assign({}, state, {
        'passwordError': undefined,
      });
    }
    case registerActions.CLEAR_EMAIL_ERROR: {
      return Object.assign({}, state, {
        'emailError': undefined,
      });
    }
    case registerActions.SENDING_CREDENTIALS: {
      const newState = Object.assign({}, state, {
        'isSending': action.payload.status !== StatusEnum.SUCCESS,
      });
      if (action.payload.status === StatusEnum.SUCCESS) {
        if (action.payload.location) {
          // Redirect to main page
          window.location.replace(action.payload.location);
          return newState;
        }
        if (action.error.message === 'DUPLICATE USERNAME') {
          newState.usernameError = L.text.usernameAlreadyInUse;
        } else
        if (action.error.message === 'DUPLICATE EMAIL') {
          newState.emailError = L.text.emailAlreadyInUse;
        } else
        if (action.error.message === 'EMPTY USERNAME') {
          newState.usernameError = L.text.addAnUsername;
        } else
        if (action.error.message === 'EMPTY PASSWORD') {
          newState.passwordError = L.text.addAPassword;
        } else
        if (action.error.message === 'EMPTY EMAIL') {
          newState.emailError = L.text.addAnEmail;
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
