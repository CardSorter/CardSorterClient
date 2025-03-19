"use client"
import React, {useEffect, useState} from 'react';

import StudyItem from './StudyItem';
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import {Study} from "reducers/studiesReducer";
import {useRouter} from "i18n/navigation";
import {useTranslations} from "next-intl";

export default function StudiesList() {
  // TODO: Convert to Link
  const router = useRouter();
  const t = useTranslations("StudiesListPage");

  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);

  // State
  const studies = useSelector((state: StateSchema) => state.studies.studies);
  const isFetching = useSelector((state: StateSchema) => state.studies.isFetching);
  const filteredBy = useSelector((state: StateSchema) => state.studies.filteredBy);

  useEffect(() => {
    if (!studies) {
      return;
    }

    if (filteredBy === "active")
      setFilteredStudies(studies.filter(study => study.isLive))
    else if (filteredBy === "inactive")
      setFilteredStudies(studies.filter(study => !study.isLive))
    else setFilteredStudies(studies)

  }, [isFetching, filteredBy]);

  return (
    <ul className="studies-container">

      {
        filteredStudies?.map((study, index) =>
          <StudyItem id={study.id} key={'studyItem' + index} title={study.title} isLive={study.isLive}
            completedNo={study.completedNo} abandonedNo={study.abandonedNo}
            launchedDate={study.launchedDate} editDate={study.editDate}
            endDate={study.endDate} />)
      }

      <button className="create-study-card" onClick={() => router.push("/create")}>
          <span className="material-symbols-outlined">add</span>
          <p>{t("create study")}</p>
      </button>
    </ul>
  );
}
