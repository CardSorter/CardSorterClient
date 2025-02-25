import React from 'react';

import Page1, {Page1PropsDispatch, Page1PropsState} from './studyCreationPages/Page1.js';
import Page2 from './studyCreationPages/Page2.jsx';
import Page3 from './studyCreationPages/Page3.jsx';
import SuccessPage from './studyCreationPages/SuccessPage.jsx';

interface StudyCreationProps {
  currentPage: number,
  page1Values: Page1PropsState,
  page1Dispatch: Page1PropsDispatch,
  page2Values: PropTypes.object.isRequired,
  page2Errors: PropTypes.object.isRequired,
  page2Dispatch: PropTypes.object.isRequired,
  page3Values: PropTypes.object.isRequired,
  page3Errors: PropTypes.object.isRequired,
  page3Dispatch: PropTypes.object.isRequired,
  page4Values: PropTypes.object.isRequired,
  page4Dispatch: PropTypes.object.isRequired,
}

const StudyCreationContainer = ({currentPage,
  page1Values, page1Dispatch,
  page2Values, page2Errors, page2Dispatch,
  page3Values, page3Errors, page3Dispatch,
  page4Values, page4Dispatch}) => {
  let render;
  if (currentPage === 1) {
    render = <Page1 values={page1Values} dispatch={page1Dispatch}/>;
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
    render = "Redirect";
  }
  return render;
};

export default StudyCreationContainer;


