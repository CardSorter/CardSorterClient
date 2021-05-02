import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import './App.scss';
import styles from './assets/constants.module.scss';
import Main from './pages/Main';
import CreateStudy from './pages/CreateStudyContainer.jsx';
import StudyPage from './pages/StudyPage';
import initializeStore from './Store';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {IntlProvider} from "react-intl";

import en_gb from './translations/en-gb.json';

const store = initializeStore();

// Define the theme of our components

const textH1 = styles.textH1.split(' ');
const textH2 = styles.textH2.split(' ');
const textH3 = styles.textH3.split(' ');
const textSubtitle1 = styles.textSubtitle1.split(' ');
const textSubtitle2 = styles.textSubtitle2.split(' ');
const textBody1 = styles.textBody1.split(' ');
const textButtonStyle = styles.textButton.split(' ');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: styles.colorPrimary,
    },
  },
  typography: {
    h1: {
      fontSize: textH1[1],
      fontWeight: parseInt(textH1[0]),
      fontFamily: textH1[2],
    },
    h2: {
      fontSize: textH2[1],
      fontWeight: parseInt(textH2[0]),
      fontFamily: textH2[2],
    },
    h3: {
      fontSize: textH3[1],
      fontWeight: parseInt(textH3[0]),
      fontFamily: textH3[2],
    },
    subtitle1: {
      fontSize: textSubtitle1[0],
      fontFamily: textSubtitle1[1],
    },
    subtitle2: {
      fontSize: textSubtitle2[1],
      fontWeight: parseInt(textSubtitle2[0]),
      fontFamily: textSubtitle2[2],
    },
    body1: {
      fontSize: textBody1[0],
      fontFamily: textBody1[1],
    },
    button: {
      fontSize: textButtonStyle[1],
      fontWeight: parseInt(textButtonStyle[0]),
      fontFamily: textButtonStyle[3],
      // @ts-ignore
      textTransform: textButtonStyle[2],
    },
  },
  shape: {
    borderRadius: 0,
  }
});

// Render tha application

export interface RouterStudyMatch {
  id: string,
}

ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <IntlProvider locale='en' messages={en_gb} >
          <Router>
            <Route exact path='/' component={Main}/>
            <Route path='/create' component={CreateStudy}/>
            <Route path={`${process.env.PUBLIC_URL}/study/:id`} component={StudyPage}/>
          </Router>
        </IntlProvider>
      </MuiThemeProvider>
    </Provider>, document.getElementById('root')
);
