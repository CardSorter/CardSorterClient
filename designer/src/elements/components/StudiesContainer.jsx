import React from 'react';
import PropTypes from 'prop-types';

import StudyItem from './StudyItem.jsx';
import CreateStudyItem from './CreateStudyItem.jsx';

const StudiesContainer = ({studies, onCreateClick}) => (
  <ul className="studies-container">
    {
      studies.map((Study) =>
        <StudyItem key={'studyItem'+Study.id} title={Study.title} isLive={Study.isLive}
          completedNo={Study.completedNo} abandonedNo={Study.abandonedNo}
          launcedDate={Study.launcedDate} editDate={Study.editDate} endDate={Study.endDate}/>)
    }
    <CreateStudyItem onClick={onCreateClick}/>
  </ul>
);

StudiesContainer.propTypes = {
  studies: PropTypes.array.isRequired,
  onCreateClick: PropTypes.func.isRequired,
};

export default StudiesContainer;
