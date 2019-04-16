import React from 'react';
import PropTypes from 'prop-types';

import StudyItem from './StudyItem.jsx';
import CreateStudyItem from './CreateStudyItem.jsx';

const StudiesContainer = ({studies, onStudyClick, onCreateClick}) => (
  <ul className="studies-container">
    {
      studies.map((Study, index) =>
        <StudyItem key={'studyItem'+index} title={Study.title} isLive={Study.isLive}
          completedNo={Study.completedNo} abandonedNo={Study.abandonedNo}
          launchedDate={Study.launchedDate} editDate={Study.editDate}
          endDate={Study.endDate} onClick={() => onStudyClick(Study.id)}/>)
    }
    <CreateStudyItem onClick={onCreateClick}/>
  </ul>
);

StudiesContainer.propTypes = {
  studies: PropTypes.array.isRequired,
  onCreateClick: PropTypes.func.isRequired,
};

export default StudiesContainer;
