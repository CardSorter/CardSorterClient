import * as uiAction from '../actions/uiAction';

/**
 *
 * @param {BoardState} state
 * @param {UIAction} action
 * @return {BoardState}
 */
export default function ui(state={}, action) {
  switch (action.type) {
    case uiAction.SHOW_DESCRICTION: {
      return Object.assign({}, state, {
        'showingDescription': action.payload.cardID,
      });
    }
    case uiAction.HIDE_ALL_DESCRIPTIONS: {
      return Object.assign({}, state, {
        'showingDescription': undefined,
      });
    }
    case uiAction.SHOW_TITLE_BOX: {
      return Object.assign({}, state, {
        'changeTitle': action.payload.categoryID,
      });
    }
    case uiAction.HIDE_ALL_BOXES: {
      return Object.assign({}, state, {
        'changeTitle': undefined,
      });
    }
    case uiAction.SAVE_STUDY_ID: {
      return Object.assign({}, state, {
        'studyID': action.payload.studyID,
      });
    }
    case uiAction.SENDING_SORT: {
      return Object.assign({}, state, {
        'sendingSort': action.payload.status,
      });
    }
    default: {
      return state;
    }
  }
}
