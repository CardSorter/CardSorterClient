import * as loginActions from '../actions/loginAction';

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
    default:
      return state;
  }
}
