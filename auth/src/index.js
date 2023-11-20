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
  //provider make store available to all components(child)
    <Provider store={store}>
      {/*stores the current location in the browser's address bar using clean URLs*/}
      {/*adding the auth after url*/}
      <Router basename={'/auth'}>
        {/*when path is / render loginPage else render registerPage so Route looks the path to now what components 
        to render*/ }
        <Route exact path='/' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
      </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
