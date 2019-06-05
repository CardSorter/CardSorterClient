import * as cardAction from '../actions/cardAction';
import * as categoryAction from '../actions/categoryAction';
import Category from '../elements/Category';

import L from '../localization/LocalizedText';

/**
 *
 * @param {boardState} state
 * @param {cardActions} action
 * @return {boardState}
 */
export default function categories(state={}, action) {
  switch (action.type) {
    case categoryAction.CREATE_CATEGORY: {
      const id = action.payload.categoryID || Date.now();
      const category = new Category(id);
      category.addCard(action.payload.cardID);

      const newState = Object.assign({}, state);
      newState[id] = category;
      return newState;
    }
    case categoryAction.REMOVE_CATEGORY: {
      const categoryID = action.payload.categoryID;
      const newState = Object.assign({}, state);

      delete newState[categoryID];
      return newState;
    }
    case categoryAction.RENAME_CATEGORY: {
      const id = action.payload.categoryID;
      const newState = Object.assign({}, state);

      newState[id].title = action.payload.title;
      return newState;
    }
    case cardAction.ADD_CARD_CATEGORY: {
      const cardID = action.payload.cardID;
      const categoryID = action.payload.categoryID;
      const newState = Object.assign({}, state);

      newState[categoryID].addCard(cardID);
      return newState;
    }
    case cardAction.REMOVE_CARD_CATEGORY: {
      const cardID = action.payload.cardID;
      const categoryID = action.payload.categoryID;
      const newState = Object.assign({}, state);

      newState[categoryID].removeCard(cardID);
      return newState;
    }
    case categoryAction.MINIMIZE_CATEGORY: {
      const categoryID = action.payload.id;
      const newState = Object.assign({}, state);

      newState[categoryID].isMinimized = action.payload.value;
      return newState;
    }
    case categoryAction.NORMALIZE_CATEGORIES: {
      const newState = Object.assign({}, state);
      for (const categoryID in newState) {
        if ({}.hasOwnProperty.call(newState, categoryID)) {
          const category = newState[categoryID];
          if (category.title === L.text.clickToRename) {
            category.title = 'not set';
          }
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
