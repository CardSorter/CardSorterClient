import React from 'react';

import StudyItem, {StudyItemState} from './StudyItem';

export interface StudiesState {
  studies: StudyItemState[],
}

const Studies: React.FC<StudiesState> = ({studies}) => (
  <ul className="studies-container">
    {
      studies.map((Study, index) =>
        <StudyItem key={'studyItem'+index} title={Study.title} isLive={Study.isLive}
          completedNo={Study.completedNo} abandonedNo={Study.abandonedNo}
          launchedDate={Study.launchedDate} editDate={Study.editDate}
          endDate={Study.endDate} id={Study.id}/>)
    }
  </ul>
);

export default Studies;
