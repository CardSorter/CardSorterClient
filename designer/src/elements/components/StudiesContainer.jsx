import React from 'react';
import PropTypes from 'prop-types';

import StudyItem from './StudyItem.jsx';
import CreateStudyItem from './CreateStudyItem.jsx';

const StudiesContainer = ({ studies, onStudyClick, onCreateClick }) => {
  // prevent cards be saved, when user going back to the studies page after copying a study
  localStorage.removeItem('cardsName');
  localStorage.removeItem('cardsDesc');

  let filteredStudies;
  if (window.location.search === '?filter=ongoing')
    filteredStudies = studies.filter(study => study.isLive)
  else if (window.location.search === '?filter=completed')
    filteredStudies = studies.filter(study => !study.isLive)
  else filteredStudies = studies;
  return (

    <ul className="studies-container">

      {

        filteredStudies.map((Study, index) =>
          <StudyItem key={'studyItem' + index} title={Study.title} isLive={Study.isLive}
            completedNo={Study.completedNo} abandonedNo={Study.abandonedNo}
            launchedDate={Study.launchedDate} editDate={Study.editDate}
            endDate={Study.endDate} onClick={() => onStudyClick(Study.id)} />)
      }
      <CreateStudyItem onClick={onCreateClick} />
    </ul>
  );
};

StudiesContainer.propTypes = {
  studies: PropTypes.array.isRequired,
  onCreateClick: PropTypes.func.isRequired,
};

export default StudiesContainer;
