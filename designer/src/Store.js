import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import app from './reducers/indexReducer';
import initialState from './reducers/stateSchema';
import localizedText from './localization/LocalizedText';

import {fetchStudies} from './actions/studyAction';
import {fetchUsername} from './actions/headerAction';

/**
 * @return {Store}
 */
export default function initializeStore() {
  const store = createStore(app, initialState, applyMiddleware(
      thunkMiddleware,
      logger
  ));

  localizedText.initialize('en-us');

  const unsuscribe = store.subscribe(() => {});

  store.dispatch(fetchUsername());
  store.dispatch(fetchStudies());


  unsuscribe();
  return store;
}
