import logger from 'redux-logger';
import {configureStore, EnhancedStore, Store} from '@reduxjs/toolkit';

import StateSchema from 'reducers/StateSchema';
import authReducer from "reducers/authReducer";
import headerReducer from "reducers/headerReducer";
import studiesReducer from "reducers/studiesReducer";
import studyCreationReducer from "reducers/studyCreationReducer";
import studyPageReducer from "reducers/studyPageReducer";
import loginReducer from "reducers/loginReducer";
import registerReducer from "reducers/registerReducer";
import sortingBoardReducer from "./reducers/sorting/sortingBoardReducer";
import sortingUiReducer from "./reducers/sorting/sortingUiReducer";

export function clearPersistedState() {
  localStorage.removeItem('auth');
  localStorage.removeItem('studyCreation');
  localStorage.removeItem('latestSave');
  window.location.reload();
}

export default function initializeStore(): Store<StateSchema> {

  const rootReducer = {
    login: loginReducer,
    register: registerReducer,
    auth: authReducer,
    header: headerReducer,
    studies: studiesReducer,
    studyCreation: studyCreationReducer,
    study: studyPageReducer,

    sortingBoard: sortingBoardReducer,
    sortingUi: sortingUiReducer,
  }

  const persistedAuth = () => {
    if (typeof window === "undefined") {
      // Exit if we are in the server environment
      return undefined;
    }

    return localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!) : undefined;
  }

  const persistedStudyCreation = () => {
    if (typeof window === "undefined") {
      // Exit if we are in the server environment
      return undefined;
    }

    // Invalidate previous state if it was saved more than 24 hours ago
    const dateMinus24hours = Date.now() - 24 * 60 * 60 * 1000;
    const latestSortingSave = localStorage.getItem("latestSortingSave");
    if (!latestSortingSave) {
      return undefined;
    }

    if (Date.parse(latestSortingSave) < dateMinus24hours) {
      return undefined;
    }

    return localStorage.getItem('studyCreation')
      ? JSON.parse(localStorage.getItem('studyCreation')!)
      : undefined;
  }

  const store: EnhancedStore<StateSchema> = configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: persistedAuth(),
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
  // If saving something in the localStorage make sure to remove it in clearPersistedState() called on logout
  store.subscribe(() => {
    const state = store.getState();
    if (!state.auth.token) {
      return; // Don't save the state if we are not authenticated
    }
    localStorage.setItem('studyCreation', JSON.stringify(state.studyCreation));
    localStorage.setItem('latestSave', Date.now().toString());
    localStorage.setItem('auth', JSON.stringify(state.auth));

    // Sort state doesn't need to be cleared on logout because it is publicly accessible
    // These are loaded by the elements/sorting/LoadSavedRecentSort.tsx when the sort page is rendered to avoid
    // hydration issues that would happen if we were populating the state like the with items above
    localStorage.setItem('sortingBoard', JSON.stringify(state.sortingBoard));
    localStorage.setItem('sortingUi', JSON.stringify(state.sortingUi));
    localStorage.setItem('latestSortingSave', Date.now().toString());
  });

  return store;
}