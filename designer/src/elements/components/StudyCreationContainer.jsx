import React from 'react';
import PropTypes from 'prop-types';

import Page1 from './studyCreationPages/Page1.jsx';
import Page2 from './studyCreationPages/Page2.jsx';
import Page3 from './studyCreationPages/Page3.jsx';

const StudyCreationContainer = ({currentPage, page1Values, page1Dispatch,
  page2, page3}) => {
  let render;
  if (currentPage === 1) {
    render = <Page1 values={page1Values} dispatch={page1Dispatch} />;
  } else
  if (currentPage === 2) {
    render = <Page2 defaultProps={page2} />;
  } else
  if (currentPage === 3) {
    render = <Page3 defaultProps={page3} />;
  }
  return render;
};

StudyCreationContainer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  page1Values: PropTypes.object.isRequired,
  page1Dispatch: PropTypes.object.isRequired,
};

export default StudyCreationContainer;


