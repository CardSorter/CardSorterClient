import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit'

import env from './enviroment';

import app from './reducers/indexReducer';
import initialState from './reducers/stateSchema';
import localizedText from './localization/LocalizedText';


/**
 * @return {Store}
 */
export default function initializeStore() {
  const store = configureStore({
    reducer: app,
    middleware: (getDefaultMiddleware) => {
      if (env !== 'PRODUCTION') {
        return getDefaultMiddleware({
          serializableCheck: false
        }).concat(logger);
      }
      return getDefaultMiddleware({
        serializableCheck: false
      });
    },
    initialState,
  })

  localizedText.initialize('en-us');

  return store;
}