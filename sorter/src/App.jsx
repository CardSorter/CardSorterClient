import 'babel-polyfill'; // Ensure all polyfills are present

// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// eslint-disable-next-line no-unused-vars
import ListContainer from './elements/containers/ListContainer.jsx';
// eslint-disable-next-line no-unused-vars
import BoardContainer from './elements/containers/BoardContainer.jsx';
// eslint-disable-next-line no-unused-vars
import HeaderContainer from './elements/containers/HeaderContainer.jsx';
// eslint-disable-next-line no-unused-vars
import MessageScreen from './elements/components/MessageScreen.jsx';
// eslint-disable-next-line no-unused-vars
import OnBoardingContainer from './elements/containers/OnBoardingContainer.jsx';
// eslint-disable-next-line no-unused-vars
import Popup from './elements/containers/PopupContainer.jsx';

import thanksImage from './icons/thanks-icon.svg';
import notFoundImage from './icons/not-found.svg';

import L from './localization/LocalizedText';
import './App.css';

/**
 * App route
 */
class App extends Component {
  /**
   * React render
   * @return {Component}
   */
  render() {
    const { studyNotFound, renderThanks, thanksMessage,
      showPopup
    } = this.props;

    let render;
    if (renderThanks) {
      render = (
        <main>
          <MessageScreen message={thanksMessage} image={thanksImage}
            submessage={'(' + L.text.youCanCloseThisTab + ')'} />
        </main>);
    } else
      if (studyNotFound) {
        render = (
          <main>
            <MessageScreen message={L.text.studyNotFound} image={notFoundImage} />
          </main>);
      } else {
        render = (
          <>

            {
              showPopup &&
              <Popup />
            }
            <OnBoardingContainer />
            <div className="App">
              <HeaderContainer />
              <div id="main-panel">
                <ListContainer />
                <BoardContainer />
              </div>
            </div>
          </>

        );
      }

    return render;
  }
}

export default connect(
  (state) => {
    return {
      studyNotFound: state.cards.notFound,
      renderThanks: state.ui.renderThanks,
      thanksMessage: state.ui.thanksMessage,
      showPopup: state.ui.popup.show,
    };
  }
)(App);
