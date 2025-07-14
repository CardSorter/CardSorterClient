"use client"
import React, {useEffect, useState} from 'react';

import StudyItem from '../StudyItem/StudyItem';
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import {Study} from "reducers/studiesReducer";
import {useRouter} from "i18n/navigation";
import {useTranslations} from "next-intl";
import styles from "./StudiesList.module.scss";





export default function StudiesList() {
  // TODO: Convert to Link
  const router = useRouter();
  const t = useTranslations("StudiesListPage");
   

  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);

  // State
  const studies = useSelector((state: StateSchema) => state.studies.studies);
  const isFetching = useSelector((state: StateSchema) => state.studies.isFetching);
  const filteredBy = useSelector((state: StateSchema) => state.studies.filteredBy);
  const searchTerm = useSelector((state: StateSchema) => state.studies.searchTerm);
  const sortOption = useSelector((state: StateSchema) => state.studies.sortOption);


  useEffect(() => {
    if (!studies) {
      return;
    }
    // it helps us to keep the array of the card untouched(Clone of the array)
    let filtered= [...studies];

    if (filteredBy === "active") {
      filtered = filtered.filter((study) => study.isLive);
    } else if (filteredBy === "inactive") {
      filtered = filtered.filter((study) => !study.isLive);
    }
    
    
    if (searchTerm && searchTerm.trim() !== "") {
      filtered = filtered.filter((study) =>
        study.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOption === "titleAsc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "titleDesc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "launchDateDesc") {
      filtered.sort((a, b) => b.launchedDate.getTime() - a.launchedDate.getTime());
    } 
    
    setFilteredStudies(filtered);

  }, [studies,isFetching, filteredBy, searchTerm, sortOption]);

  return (
    <ul className={styles.studiesList}>

      {
        filteredStudies?.map((study, index) =>
          <StudyItem id={study.id} key={'studyItem' + index} title={study.title} isLive={study.isLive}
            completedNo={study.completedNo} abandonedNo={study.abandonedNo}
            launchedDate={study.launchedDate} editDate={study.editDate}
            endDate={study.endDate} />)
      }

      <button className={styles.createStudyCard} onClick={() => router.push("/create")}>
          <span className="material-symbols-outlined">add</span>
          <p>{t("create study")}</p>
      </button>
    </ul>
  );
}
