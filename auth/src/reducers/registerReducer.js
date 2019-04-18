import * as registerActions from '../actions/registerAction';

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
    default:
      return state;
  }
}
