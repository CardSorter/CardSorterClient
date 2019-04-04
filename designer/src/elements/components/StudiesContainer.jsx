import React from 'react';
import PropTypes from 'prop-types';

import StudyItem from './StudyItem.jsx';
import CreateStudyItem from './CreateStudyItem.jsx';

const StudiesContainer = ({studies}) => (
  <ul className="studies-container">
    {
      studies.map((Study) =>
        <StudyItem key={'studyItem'+Study.id} title={Study.title} isLive={Study.isLive}
          completedNo={Study.completedNo} abandonedNo={Study.abandonedNo}
          launcedDate={Study.launcedDate} editDate={Study.editDate} endDate={Study.endDate}/>)
    }
    <CreateStudyItem />
  </ul>
);

StudiesContainer.propTypes = {
  studies: PropTypes.array.isRequired,
};

export default StudiesContainer;
