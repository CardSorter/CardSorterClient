import logger from 'redux-logger';
import {configureStore, EnhancedStore, Store} from '@reduxjs/toolkit';

import localizedText from 'localization/LocalizedText';
import StateSchema from 'reducers/StateSchema';
import authReducer from "reducers/authReducer";
import headerReducer from "reducers/headerReducer";
import studiesReducer from "reducers/studiesReducer";
import studyCreationReducer from "reducers/studyCreationReducer";
import studyPageReducer from "reducers/studyPageReducer";

export default function initializeStore(): Store<StateSchema> {

  const rootReducer = {
    auth: authReducer,
    header: headerReducer,
    studies: studiesReducer,
    studyCreation: studyCreationReducer,
    study: studyPageReducer,
  }

  const persistedStudyCreation = () => {
    const dateMinus24hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (!localStorage.getItem("latestSave")) {
      return undefined;
    }

    // Invalidate previous state if it was saved more than 24 hours ago
    // @ts-ignore already checked if undefined
    if (Date.parse(localStorage.getItem("latestSave")) < dateMinus24hours) {
      return undefined;
    }

    return localStorage.getItem('studyCreation')
      ? JSON.parse(localStorage.getItem('studyCreation')!)
      : undefined;
  }

  const store: EnhancedStore<StateSchema> = configureStore({
    reducer: rootReducer,
    preloadedState: {
      studyCreation: persistedStudyCreation(),
    },
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

  // Save state to localStorage on changes
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('studyCreation', JSON.stringify(state.studyCreation));

    localStorage.setItem('latestSave', Date.now().toString());
  });

  localizedText.initialize('en-us');

  return store;
}