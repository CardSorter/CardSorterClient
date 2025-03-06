"use client"
import React, {useEffect, useState} from 'react';

import StudyItem from './StudyItem';
import CreateStudyItem from './CreateStudyItem';
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";

export default function StudiesList() {
  const [filteredStudies, setFilteredStudies] = useState<any[]>([]);

  // State
  const studies = useSelector((state: StateSchema) => state.studies.studies);
  const isFetching = useSelector((state: StateSchema) => state.studies.isFetching);

  // TODO: Needs to be refactored to use the global redux state
  useEffect(() => {
    // prevent cards be saved, when user going back to the studies page after copying a study
    localStorage.removeItem('cardsName');
    localStorage.removeItem('cardsDesc');

    if (!studies) {
      return;
    }

    if (window.location.search === '?filter=ongoing')
      setFilteredStudies(studies.filter(study => study.isLive))
    else if (window.location.search === '?filter=completed')
      setFilteredStudies(studies.filter(study => !study.isLive))
    else setFilteredStudies(studies)

  }, [isFetching])
  // End of refactor change

  return (
    <ul className="studies-container">

      {
        filteredStudies?.map((study, index) =>
          <StudyItem id={study.id} key={'studyItem' + index} title={study.title} isLive={study.isLive}
            completedNo={study.completedNo} abandonedNo={study.abandonedNo}
            launchedDate={study.launchedDate} editDate={study.editDate}
            endDate={study.endDate} />)
      }
      <CreateStudyItem />
    </ul>
  );
}
