// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import {Provider} from 'react-redux';

import './index.css';
import initializeStore from './Store';
// eslint-disable-next-line no-unused-vars
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = initializeStore();
ReactDOM.render(<Provider store={store}><App /></Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
