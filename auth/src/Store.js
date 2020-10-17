import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import env from './enviroment';

import app from './reducers/indexReducer';
import initialState from './reducers/stateSchema';
import localizedText from './localization/LocalizedText';

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

  localizedText.initialize('en-us');

  const unsuscribe = store.subscribe(() => {});

  unsuscribe();
  return store;
}
