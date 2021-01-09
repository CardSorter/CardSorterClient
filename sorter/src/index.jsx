// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import {Provider} from 'react-redux';

import './index.css';
import initializeStore from './Store';
// eslint-disable-next-line no-unused-vars
import App from './App';

const store = initializeStore();
ReactDOM.render(<Provider store={store}><App /></Provider>,
    document.getElementById('root'));