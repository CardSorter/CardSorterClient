import * as headerActions from '../actions/headerAction';
import * as StatusEnum from '../static/StatusEnum';

/**
 *
 * @param {headerState} state
 * @param {headerActions} action
 * @return {headerState}
 */
export default function headerReducer(state={}, action) {
  switch (action.type) {
    case headerActions.TOGGLE_PROFILE_SETTINGS: {
      return Object.assign({}, state, {
        'profileUnfold': action.payload.toggle,
      });
    }
    case headerActions.LOGOUT: {
      // Delete the auth token
      document.cookie
                = 'auth_token= ;expires = Thu, 01 Jan 1970 00:00:00 GMT';
      // Redirect to the main page
      document.location.replace('auth/');
      return state;
    }
    case headerActions.REQUEST_USERNAME: {
      return Object.assign({}, state, {
        'username': (action.payload.status === StatusEnum.SUCCESS) ?
                    action.payload.username : '',
      });
    }
    default: {
      return state;
    }
  }
}
