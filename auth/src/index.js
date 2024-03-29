/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import initializeStore from './Store';
import * as serviceWorker from './serviceWorker';

const store = initializeStore();
ReactDOM.render(
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
      </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
