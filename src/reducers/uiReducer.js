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
    default: {
      return state;
    }
  }
}
