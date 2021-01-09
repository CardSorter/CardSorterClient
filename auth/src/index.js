import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import initializeStore from './Store';

const store = initializeStore();
ReactDOM.render(
    <Provider store={store}>
      <Router basename={'/auth'}>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
      </Router>
    </Provider>, document.getElementById('root'));
