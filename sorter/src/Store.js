import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import env from './enviroment';

import app from './reducers/indexReducer';
import initialState from './reducers/boardState';
import {fetchCards} from './actions/cardAction';
import L from './localization/LocalizedText';

/**
 * @return {Store}
 */
export default function initializeStore() {
  const middleware = [thunkMiddleware];
  if (env !== 'PRODUCTION') {
    middleware.push(logger);
  }

  const store = createStore(app, initialState, applyMiddleware(
      ...middleware
  ));

  const unsuscribe = store.subscribe(() => {});
  // () => debugConsole(store.getState())
  // runTest(store);

  // Initialize locale
  L.initialize('en-us');

  // Get the id param
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  // Load the cards
  store.dispatch(fetchCards(id));

  // debugConsole(store.getState());

  unsuscribe();
  return store;
}
