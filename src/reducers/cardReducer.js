import {combineReducers} from 'redux';

import * as cardActions from '../actions/cardAction';
import initialState from './boardState';
import debugconsole from '../debug/Debugconsole';
import Category from '../elements/Category';

/**
 *
 * @param {boardState} state
 * @param {cardActions.CREATE_CATEGORY} action
 */
function categories(state=initialState, action) {
  switch (action.type) {
    case cardActions.CREATE_CATEGORY: {
      const category = new Category(action.payload.categoryID, action.payload.title);
      category.addCard(action.payload.cardID);

      return [
        ...state,
        category
      ];
    }
    default:
      return state;
  }
}

/**
 *
 * @param {boardState} state
 * @param {ReduxAction} action
 * @return {boardState}
 */
function cards(state=initialState, action) {
  switch (action.type) {
    case cardActions.ADD_CARD_CATEGORY: {
      debugconsole('Adding card');
      return state;
    }
    case cardActions.REMOVE_CARD_CATEGORY: {
      debugconsole('Removing card');
      return state;
    }
    default:
      return state;
  }
}


const app = combineReducers({
  categories,
  cards,
});

export default app;
