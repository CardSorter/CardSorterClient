import * as studyActions from '../actions/studyPageAction';

/**
 *
 * @param {stateSchema} state
 * @param {studyPageAction} action
 * @return {stateSchema}
 */
export default function studyPageReducer(state={}, action) {
  switch (action.type) {
    case studyActions.CHANGE_VIEW: {
      return Object.assign({}, state, {
        'selectedItem': action.payload.no,
      });
    }
    default: {
      return state;
    }
  };
}
