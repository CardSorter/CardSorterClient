import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import env from './enviroment';

import app from './reducers/indexReducer';
import initialState from './reducers/stateSchema';
import localizedText from './localization/LocalizedText';

/**
 * initialize the store
 * @return {Store}
 */

// eslint-disable-next-line require-jsdoc
export default function initializeStore() {
  const middleware = [thunkMiddleware];
  if (env !== 'PRODUCTION') {
    middleware.push(logger);
  }

  const store = createStore(app, initialState, applyMiddleware(
      ...middleware,
  ));

  localizedText.initialize('en-us');
  /* function unsubscribe is defined to unsubscribe the store's listener.
  This is done to ensure that the initial state
  is not modified by the listener immediately after creation.
  The unsubscribe function is immediately invoked,
  preventing the listener from being called again.*/
  const unsuscribe = store.subscribe(() => {});

  unsuscribe();
  return store;
}
