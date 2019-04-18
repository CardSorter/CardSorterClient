import * as loginActions from '../actions/loginAction';
import * as StatusEnum from '../static/StatusEnum';

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
          newState.usernameError = 'NOT FOUND';
        } else
        if (action.error.message === 'INVALID PASSWORD') {
          newState.passwordError = 'INVALID';
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
