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
    case studyCreationActions.ADD_CARD: {
      const newState = Object.assign({}, state);
      newState['cards'][action.payload.id] = {
        id: action.payload.id,
        title: undefined,
        description: undefined,
      };
      return newState;
    }
    case studyCreationActions.CHANGE_CARD_NAME: {
      const newState = Object.assign({}, state);
      newState['cards'][action.payload.id].name =
        action.payload.name;
      return newState;
    }
    case studyCreationActions.CHANGE_CARD_DESCRIPTION: {
      const newState = Object.assign({}, state);
      newState['cards'][action.payload.id].description =
        action.payload.description;
      return newState;
    }
    default: {
      return state;
    }
  }
}
