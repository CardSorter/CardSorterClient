import {createStore} from 'redux';

import debugConsole from './debug/Debugconsole';
import app from './reducers/cardReducer';
import initialState from './reducers/boardState';
import runTest from './tests';

/**
 *
 */
export default function initializeStore() {
  const store = createStore(app, initialState);
  // const store = createStore(app, window.STATE_FROM_SERVER);

  debugConsole(store.getState());

  const unsuscribe = store.subscribe(() => debugConsole(store.getState()));
  runTest(store);

  unsuscribe();
  return store;
}
