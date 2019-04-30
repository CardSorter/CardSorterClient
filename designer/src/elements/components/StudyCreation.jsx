// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import Page1 from './studyCreationPages/Page1.jsx';
// eslint-disable-next-line no-unused-vars
import Page2 from './studyCreationPages/Page2.jsx';
// eslint-disable-next-line no-unused-vars
import Page3 from './studyCreationPages/Page3.jsx';
// eslint-disable-next-line no-unused-vars
import SuccessPage from './studyCreationPages/SuccessPage.jsx';

const StudyCreationContainer = ({currentPage,
  page1Values, page1Errors, page1Dispatch,
  page2Values, page2Errors, page2Dispatch,
  page3Values, page3Errors, page3Dispatch,
  page4Values, page4Dispatch}) => {
  let render;
  if (currentPage === 1) {
    render = <Page1 values={page1Values} errors={page1Errors}
      dispatch={page1Dispatch}/>;
  } else
  if (currentPage === 2) {
    render = <Page2 values={page2Values} errors={page2Errors}
      dispatch={page2Dispatch}/>;
  } else
  if (currentPage === 3) {
    render = <Page3 values={page3Values} errors={page3Errors}
      dispatch={page3Dispatch}/>;
  } else
  if (currentPage === 4) {
    render = <SuccessPage values={page4Values} dispatch={page4Dispatch}/>;
  } else
  if (currentPage === -1) {
    render = <Redirect to='/'/>;
  }
  return render;
};

StudyCreationContainer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  page1Values: PropTypes.object.isRequired,
  page1Errors: PropTypes.object.isRequired,
  page1Dispatch: PropTypes.object.isRequired,
  page2Values: PropTypes.object.isRequired,
  page2Errors: PropTypes.object.isRequired,
  page2Dispatch: PropTypes.object.isRequired,
  page3Values: PropTypes.object.isRequired,
  page3Errors: PropTypes.object.isRequired,
  page3Dispatch: PropTypes.object.isRequired,
  page4Values: PropTypes.object.isRequired,
  page4Dispatch: PropTypes.object.isRequired,
};

export default StudyCreationContainer;


