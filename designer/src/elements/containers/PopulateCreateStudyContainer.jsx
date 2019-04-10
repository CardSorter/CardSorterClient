import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

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
    }
  } catch (err) {
    return;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentPage: ownProps.currentPage,
    page1Values: {
      title: state.studyCreation.title,
      url: state.studyCreation.urlPrefix,
    },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    page1Dispatch: {
      onChange: (name, event) =>
        onElementChange(dispatch, name, event),

      onNext: () =>{
        ownProps.history.push('./2');
      },
      onPrev: (title, desc, url) => {
      },
    },
    page2: () =>{
      return {
        onNext: (title, desc, url) =>{
        },
        onPrev: (title, desc, url) => {
        },
      };
    },
    page3: () =>{
      return {
        onNext: (title, desc, url) =>{
        },
        onPrev: (title, desc, url) => {
        },
        url: 'cardsorter.com/sort/user/title',
      };
    },
  };
};

const PopulateCreateStudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudyCreationContainer);

export default PopulateCreateStudyContainer;
