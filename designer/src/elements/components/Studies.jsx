import React from 'react';
import PropTypes from 'prop-types';

import StudyItem from './StudyItem.jsx';

const Studies = ({studies, onStudyClick}) => (
  <ul className="studies-container">
    {
      studies.map((Study, index) =>
        <StudyItem key={'studyItem'+index} title={Study.title} isLive={Study.isLive}
          completedNo={Study.completedNo} abandonedNo={Study.abandonedNo}
          launchedDate={Study.launchedDate} editDate={Study.editDate}
          endDate={Study.endDate} onClick={() => onStudyClick(Study.id)}/>)
    }
  </ul>
);

Studies.propTypes = {
  studies: PropTypes.array.isRequired,
};

export default Studies;
