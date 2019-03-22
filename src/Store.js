import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

import app from './reducers/indexReducer';
import initialState from './reducers/boardState';
import runTest from './tests';

/**
 *
 */
export default function initializeStore() {
  const store = createStore(app, initialState, applyMiddleware(logger));
  // const store = createStore(app, window.STATE_FROM_SERVER);

  const unsuscribe = store.subscribe(() => {});
  // () => debugConsole(store.getState())
  runTest(store);

  // debugConsole(store.getState());

  unsuscribe();
  return store;
}
