import {combineReducers} from 'redux';
import containerReducer from './containerReducer';
import categoriesReducer from './categoriesReducer';
import uiReducer from './uiReducer';

const app = combineReducers({
  categories: categoriesReducer,
  container: containerReducer,
  ui: uiReducer,
});

export default app;
