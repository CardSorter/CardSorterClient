import * as studyActions from '../actions/studyAction';

/**
 *
 * @param {boardState} state
 * @param {cardActions} action
 * @return {boardState}
 */
export default function studyReducer(state={}, action) {
  switch (action.type) {
    case studyActions.LOAD_STUDIES: {
      return Object.assign({}, state, {
        'studies': action.payload.studies,
      });
    }
    default: {
      return state;
    }
  }
}
