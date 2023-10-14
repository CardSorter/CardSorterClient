import { connect } from 'react-redux';

import StudyCreation from '../components/StudyCreation.jsx';
import * as studyCreationAction from '../../actions/studyCreationAction';

/**
 * The onChange handler.
 * @param {StoreDispatch} dispatch
 * @param {String} name the name of the element that has been changed:
 * - title
 * - description
 * @param {SyntheticEvent} event the event that has been triggered
 */
function onElementChange(dispatch, name, event) {
  try {
    const value = event.target.value;
    switch (name) {
      case 'title': {
        dispatch(studyCreationAction.toggleTitleError(false));
        dispatch(studyCreationAction.changeTitle(value));
        break;
      }
      case 'description': {
        dispatch(studyCreationAction.toggleDescriptionError(false));
        dispatch(studyCreationAction.changeDescription(value));
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
    cards: state.cards,
    message: state.thanksMessage,
    link: state.link,
  };
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.studyCreation.ui.currentPage,
    page1Values: {
      title: state.studyCreation.title,
      description: state.studyCreation.description,
    },
    page1Errors: {
      title: state.studyCreation.errorTitle,
      description: state.studyCreation.errorDescription,
    },
    page2Values: {
      cards: Object.values(state.studyCreation.cards),
    },
    page2Errors: {
      cards: state.studyCreation.errorCards,
      duplicate: state.studyCreation.errorDuplicate,
    },
    page3Values: {
      message: state.studyCreation.thanksMessage,
      study: constructState(state.studyCreation),
      link: state.studyCreation.link,
    },

    page3Errors: {
      message: state.studyCreation.errorMessage,
    },
    page4Values: {
      share_url: state.studyCreation.share_url,
    },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    page1Dispatch: {
      onChange: (name, event) => {
        onElementChange(dispatch, name, event);
      },
      onNext: (title, description) => {
        // Check for errors
        if (!title || title.length === 0) {
          dispatch(studyCreationAction.toggleTitleError(true));
          setTimeout(() => studyCreationAction.toggleTitleError(false),
            5000);
          return;
        }
        if (!description || description.length === 0) {
          dispatch(studyCreationAction.toggleDescriptionError(true));
          setTimeout(() => studyCreationAction.toggleDescriptionError(false),
            5000);
          return;
        }
        dispatch(studyCreationAction.showPage(2));
      },
      onPrev: () => {
      },
    },
    page2Dispatch: {
      onCreateCard: () => {
        dispatch(studyCreationAction.addCard(Date.now()));
      },
      onCreateXCards: (cardNoRef) => {
        dispatch(studyCreationAction.addXCards(
          parseInt(cardNoRef.current.value)));
      },
      onCardNameChange: (id, event) => {
        dispatch(studyCreationAction.toggleCardError(false));
        dispatch(studyCreationAction.toggleCardDuplicate(false));
        const name = event.target.value;
        dispatch(studyCreationAction.changeCardName(id, name));
      },
      onCardDescriptionChange: (id, event) => {
        const description = event.target.value;
        dispatch(studyCreationAction.changeCardDescription(id, description));
      },
      onDeleteCard: (id) => {
        dispatch(studyCreationAction.deleteCard(id));
      },
      onNext: (cards) => {
        let hasErrors = false; // Initialize error flag

        // Check for errors
        cards.forEach((card, index) => {
          if (!card.name || card.name.length === 0) {
            hasErrors = true; // Set the flag to true
          }
        });

        // If any errors were found, don't proceed
        if (hasErrors) {
          dispatch(studyCreationAction.toggleCardError(true));
          setTimeout(() => studyCreationAction.toggleCardError(false), 5000);
          return;
        }

        const cardNames = cards.map((card) => card.name.trim().toLowerCase());
        const duplicateCardNames = new Set();
        const seenCardNames = new Set();

        for (const cardName of cardNames) {
          if (seenCardNames.has(cardName)) {
            duplicateCardNames.add(cardName);
          } else {
            seenCardNames.add(cardName);
          }
        }
        if (duplicateCardNames.size > 0) {
          dispatch(studyCreationAction.toggleCardDuplicate(true));
          setTimeout(() => studyCreationAction.toggleCardDuplicate(false), 5000);
          return;
        }

        dispatch(studyCreationAction.showPage(3));
      },
      onPrev: () => {
        dispatch(studyCreationAction.showPage(1));
      },
    },
    page3Dispatch: {
      onMessageChange: (e) => {
        dispatch(studyCreationAction.toggleThanksError(false));
        const message = e.target.value;
        dispatch(studyCreationAction.changeThanksMessage(message));
      },
      onLink: (e) => {
        const link = e.target.value;
        dispatch(studyCreationAction.changeLink(link));
      },
      onNext: (study) => {
        // Check for errors
        if (!study.message || study.message.length === 0) {
          dispatch(studyCreationAction.toggleThanksError(true));
          setTimeout(() => studyCreationAction.toggleThanksError(false),
            5000);
          return;
        }
        dispatch(studyCreationAction.sendStudy(study));
      },
      onPrev: () => {
        dispatch(studyCreationAction.showPage(2));
      },
    },
    page4Dispatch: {
      onCopy: (urlRef) => {
        urlRef.current.select();
        document.execCommand('copy');
      },
      onButtonClick: () => {
        dispatch(studyCreationAction.openStudyPage());
      },
    },
  };
};

const StudyCreationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudyCreation);

export default StudyCreationContainer;
