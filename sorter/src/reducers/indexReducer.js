import {combineReducers} from 'redux';
import containerReducer from './containerReducer';
import categoriesReducer from './categoriesReducer';
import uiReducer from './uiReducer';
import cardReducer from './cardReducer';

const app = combineReducers({
  cards: cardReducer,
  categories: categoriesReducer,
  container: containerReducer,
  ui: uiReducer,
});

export default app;
