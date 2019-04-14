import {connect} from 'react-redux';

import StudyCreationContainer from '../components/StudyCreationContainer.jsx';
import * as studyCreationAction from '../../actions/studyCreationAction';

/**
 * The onChange handler.
 * @param {StoreDispatch} dispatch
 * @param {String} name the name of the element that has been changed:
 * - title
 * - description
 * - url
 * @param {SyntheticEvent} event the event that has been triggered
 */
function onElementChange(dispatch, name, event) {
  try {
    const value = event.target.value;
    switch (name) {
      case 'title': {
        dispatch(studyCreationAction.changeTitle(value));
        dispatch(studyCreationAction.changeURL(value));
        break;
      }
      case 'description': {
        dispatch(studyCreationAction.changeDescription(value));
        break;
      }
      case 'url': {
        dispatch(studyCreationAction.changeURL(value));
        break;
      }
      default: {
        break;
      }
    }
  } catch (err) {
    return;
  }
}

/**
 * Constructs the state object that is going to be send.
 * @param {Object} state
 * @return {Object}
 */
function constructState(state) {
  return {
    title: state.title,
    description: state.description,
    url: state.url,
    cards: state.cards,
    message: state.thanksMessage,
  };
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.studyCreation.ui.currentPage,
    page1Values: {
      title: state.studyCreation.title,
      titleValidity: state.studyCreation.ui.validTitle,
      url: state.studyCreation.urlPrefix,
    },
    page2Values: {
      cards: Object.values(state.studyCreation.cards),
    },
    page3Values: {
      message: state.studyCreation.thanksMessage,
      url: state.studyCreation.urlPrefix + state.studyCreation.url,
      study: constructState(state.studyCreation),
    },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    page1Dispatch: {
      onChange: (name, event) => {
        onElementChange(dispatch, name, event);
      },
      onNext: () => {
        dispatch(studyCreationAction.showPage(2));
      },
      onPrev: () => {
      },
    },
    page2Dispatch: {
      onCreateCard: () => {
        dispatch(studyCreationAction.addCard(Date.now()));
      },
      onCardNameChange: (id, event) => {
        const name = event.target.value;
        dispatch(studyCreationAction.changeCardName(id, name));
      },
      onCardDescriptionChange: (id, event) => {
        const description = event.target.value;
        dispatch(studyCreationAction.changeCardDescription(id, description));
      },
      onNext: () =>{
        dispatch(studyCreationAction.showPage(3));
      },
      onPrev: () => {
        dispatch(studyCreationAction.showPage(1));
      },
    },
    page3Dispatch: {
      onMessageChange: (e) => {
        const message = e.target.value;
        dispatch(studyCreationAction.changeThanksMessage(message));
      },
      onNext: (study) =>{
        dispatch(studyCreationAction.sendStudy(study));
      },
      onPrev: () => {
        dispatch(studyCreationAction.showPage(2));
      },
    },
  };
};

const PopulateCreateStudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudyCreationContainer);

export default PopulateCreateStudyContainer;
