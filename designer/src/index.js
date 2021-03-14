import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import './App.scss';
import Main from './pages/Main';
import CreateStudy from './pages/CreateStudyContainer.jsx';
import StudyPage from './pages/StudyPage.jsx';
import initializeStore from './Store';

const store = initializeStore();
ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Main}/>
        <Route path='/create' component={CreateStudy}/>
        <Route path={`${process.env.PUBLIC_URL}/study/:id`}
          component={StudyPage}/>
      </Router>
    </Provider>, document.getElementById('root')
);
