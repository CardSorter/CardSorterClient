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
