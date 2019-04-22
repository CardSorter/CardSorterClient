import * as cardActions from '../actions/cardAction';
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
      const category = new Category(id, action.payload.title);
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
    case cardActions.ADD_CARD_CATEGORY: {
      const cardID = action.payload.cardID;
      const categoryID = action.payload.categoryID;
      const newState = Object.assign({}, state);

      newState[categoryID].addCard(cardID);
      return newState;
    }
    case cardActions.REMOVE_CARD_CATEGORY: {
      const cardID = action.payload.cardID;
      const categoryID = action.payload.categoryID;
      const newState = Object.assign({}, state);

      newState[categoryID].removeCard(cardID);
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
