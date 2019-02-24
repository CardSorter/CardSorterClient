import {createStore} from 'redux';

import debugConsole from './debug/Debugconsole';
import app from './reducers/cardReducer';
import * as cardActions from './actions/cardAction';
import initialState from './reducers/boardState';

export default function initializeStore() {
    const store = createStore(app, initialState);
    // const store = createStore(app, window.STATE_FROM_SERVER);

    debugConsole(store.getState());

    const unsuscribe = store.subscribe(() => debugConsole(store.getState()));

    store.dispatch(cardActions.createCategory(32, 'I am a category', 64321));
    store.dispatch(cardActions.createCategory(43, 'Hello', 43523));

    unsuscribe();
    return store;
}
