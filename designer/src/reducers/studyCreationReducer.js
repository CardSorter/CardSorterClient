import * as studyCreationActions from '../actions/studyCreationAction';

/**
 *
 * @param {boardState} state
 * @param {cardActions} action
 * @return {boardState}
 */
export default function studyCreationReducer(state={}, action) {
  switch (action.type) {
    case studyCreationActions.CHANGE_TITLE: {
      return Object.assign({}, state, {
        'title': action.payload.title,
      });
    }
    case studyCreationActions.CHANGE_DESCRIPTION: {
      return Object.assign({}, state, {
        'description': action.payload.description,
      });
    }
    case studyCreationActions.CHANGE_URL: {
      return Object.assign({}, state, {
        'url': action.payload.url,
      });
    }
    default: {
      return state;
    }
  }
}
