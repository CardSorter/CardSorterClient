import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import app from './reducers/indexReducer';
import initialState from './reducers/boardState';
import {fetchCards} from './actions/cardAction';

/**
 *
 */
export default function initializeStore() {
  const store = createStore(app, initialState, applyMiddleware(
      thunkMiddleware,
      logger));
  // const store = createStore(app, window.STATE_FROM_SERVER);

  const unsuscribe = store.subscribe(() => {});
  // () => debugConsole(store.getState())
  // runTest(store);

  // Load the cards
  store.dispatch(fetchCards(1));

  // debugConsole(store.getState());

  unsuscribe();
  return store;
}
