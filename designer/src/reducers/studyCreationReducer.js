import * as StatusEnum from '../static/StatusEnum';
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
    case studyCreationActions.ADD_CARD: {
      const newState = Object.assign({}, state);
      newState['cards'][action.payload.id] = {
        id: action.payload.id,
        name: undefined,
        description: undefined,
      };
      return newState;
    }
    case studyCreationActions.ADD_X_CARDS: {
      const newState = Object.assign({}, state);

      const id = Date.now();
      for (let i = 0; i < action.payload.no; i++) {
        newState['cards'][id+i] = {
          id: id+i,
          name: 'A very large title title tile',
          description: undefined,
        };
      }
      return newState;
    }
    case studyCreationActions.DELETE_CARD: {
      const newState = Object.assign({}, state);
      delete newState['cards'][action.payload.id];
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
    case studyCreationActions.CHANGE_THANKS_MESSAGE: {
      return Object.assign({}, state, {
        'thanksMessage': action.payload.message,
      });
    }
    case studyCreationActions.TOGGLE_TITLE_ERROR: {
      return Object.assign({}, state, {
        'errorTitle': action.payload.status,
      });
    }
    case studyCreationActions.TOGGLE_DESCRIPTION_ERROR: {
      return Object.assign({}, state, {
        'errorDescription': action.payload.status,
      });
    }
    case studyCreationActions.TOGGLE_CARD_ERROR: {
      return Object.assign({}, state, {
        'errorCards': action.payload.status,
      });
    }
    case studyCreationActions.TOGGLE_THANKS_ERROR: {
      return Object.assign({}, state, {
        'errorMessage': action.payload.status,
      });
    }
    case studyCreationActions.SHOW_PAGE: {
      const newState = Object.assign({}, state);
      newState['ui'].currentPage = action.payload.pageNo;
      return newState;
    }
    case studyCreationActions.OPEN_STUDY_PAGE: {
      window.location.assign(state.url_to_study);
      return state;
    }
    case studyCreationActions.CREATE_STUDY: {
      const newState = Object.assign({}, state);
      if (action.payload.status === StatusEnum.SUCCESS) {
        newState.url_to_study = action.payload.study.url_to_study;
        newState.share_url = action.payload.study.share_url;
        newState.ui.currentPage = 4;
      }
      newState.ui.studySending = action.payload.status;
      return newState;
    }
    default: {
      return state;
    }
  }
}
