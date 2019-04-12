import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import app from './reducers/indexReducer';
import initialState from './reducers/stateSchema';
import localizedText from './localization/LocalizedText';

import {fetchStudies} from './actions/studyAction';
import {runTests} from './tests/simpleImporting';

/**
 * @return {Store}
 */
export default function initializeStore() {
  const store = createStore(app, initialState, applyMiddleware(
      thunkMiddleware,
      logger));
  // const store = createStore(app, window.STATE_FROM_SERVER);
  localizedText.initialize('en-us');

  const unsuscribe = store.subscribe(() => {});

  // runTests(store);
  store.dispatch(fetchStudies());


  unsuscribe();
  return store;
}
