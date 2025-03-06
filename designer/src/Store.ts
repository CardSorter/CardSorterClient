import logger from 'redux-logger';
import {configureStore, EnhancedStore, Store} from '@reduxjs/toolkit';

import localizedText from './localization/LocalizedText';
import StateSchema from 'reducers/StateSchema';
import authReducer from "./reducers/authReducer";
import headerReducer from "./reducers/headerReducer";
import studiesReducer from "./reducers/studiesReducer";
import studyCreationReducer from "./reducers/studyCreationReducer";
import studyPageReducer from "./reducers/studyPageReducer";

export default function initializeStore(): Store<StateSchema> {

  const rootReducer = {
    auth: authReducer,
    header: headerReducer,
    studies: studiesReducer,
    studyCreation: studyCreationReducer,
    study: studyPageReducer,
  }

  const store: EnhancedStore<StateSchema> = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      if (process.env.NODE_ENV !== 'PRODUCTION') {
        return getDefaultMiddleware({
            serializableCheck: false,
          }).concat(logger);
      }
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });

  localizedText.initialize('en-us');

  return store;
}