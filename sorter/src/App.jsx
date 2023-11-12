import 'babel-polyfill'; // Ensure all polyfills are present

// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { DragDropContextProvider } from 'react-dnd';
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
import SplitPane from "react-split-pane";
import Toast from './elements/components/Toast.jsx';
import { closeToast } from './actions/uiAction.js';
import DescriptionPopup from './elements/components/DescriptionPopup.jsx';

/**
 * App route
 */
class App extends Component {

  closeToastFunction = () => {
    this.props.closeToast();
  }
  /**
   * React render
   * @return {Component}
   */
  render() {
    const { studyNotFound, renderThanks, thanksMessage, link, renderLink,
      showPopup, showToast, showDescriptionPopup, title, description } = this.props;

    let render;
    if (renderThanks) {

      render = (
        <main>
          <MessageScreen message={thanksMessage} link={link} renderLink={renderLink} image={thanksImage}
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
            {showToast &&
              <Toast message={L.text.noCategoryCreated} showToast={true} hidingErrorTitle={this.closeToastFunction} />
            }
            {showDescriptionPopup &&
              <DescriptionPopup title={title} description={description} />

            }
            {showPopup &&
              <Popup />
            }
            <OnBoardingContainer />
            <div className="App">

              <HeaderContainer />
              <div id="main-panel">
                <SplitPane
                  className="split-pane"
                  split="vertical"
                  minSize={200}
                  maxSize={-300}
                  defaultSize={'22rem'}

                >
                  <ListContainer />
                  <BoardContainer />
                </SplitPane>

              </div>

            </div>
          </>)
      };



    return render;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    closeToast: () => dispatch(closeToast()),
  };
};

export default connect(
  (state) => ({

    studyNotFound: state.cards.notFound,
    renderThanks: state.ui.renderThanks,
    thanksMessage: state.ui.thanksMessage,
    link: state.ui.link,
    renderLink: state.ui.renderLink,
    showPopup: state.ui.popup.show,
    showToast: state.ui.showToast,
    showDescriptionPopup: state.ui.showDescriptionPopup.show,
    title: state.ui.showDescriptionPopup.title,
    description: state.ui.showDescriptionPopup.description,

  }),
  mapDispatchToProps,
)(App);
