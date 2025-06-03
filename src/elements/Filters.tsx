"use client"

import React, {useEffect, useState} from 'react';
import {useTranslations} from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as studiesActions from "actions/studiesAction";

export default function Filters(){
  const t = useTranslations("StudiesListPage");

  // State
  const filteredBy = useSelector((state: StateSchema) => state.studies.filteredBy);
  const [searchTerm , setSearchTerm]= useState("");
  const [sortOption, setSortOption]= useState("editDateDesc")

  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(studiesActions.setSearchTerm(""));
    setSearchTerm("");
  }, []);

  function onAllClick() {
    dispatch(studiesActions.setStudyFilter({filter: undefined}));
  }

  function onOngoingClick() {
    if (filteredBy !== "active") {
      dispatch(studiesActions.setStudyFilter({filter: "active"}));
    } else {
      dispatch(studiesActions.setStudyFilter({filter: undefined}));
    }
  }

  function onInactiveClick() {
    if (filteredBy !== "inactive") {
      dispatch(studiesActions.setStudyFilter({filter: "inactive"}));
    } else {
      dispatch(studiesActions.setStudyFilter({filter: undefined}));
    }
  }
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>){
    setSearchTerm(e.target.value);
    dispatch(studiesActions.setSearchTerm(e.target.value));
  }
  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSortOption(value);
    dispatch(studiesActions.setSortOption(value));
  }


  return (
    <div className="filter-container">
      <button className={!filteredBy? "active" : ""} onClick={onAllClick}>{t("filters all")}</button>
      <button className={(filteredBy === "active"? "active" : "")} onClick={onOngoingClick}>{t("filters ongoing")}</button>
      <button className={(filteredBy === "inactive"? "active" : "")} onClick={onInactiveClick}>{t("filters completed")}</button>
      <div className="search-container"><img src="/card-sorter/images/search-icon.png" alt="Remote Icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search your study..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div>
      <select
       className="sort-dropdown"
       value={sortOption}
       onChange={handleSortChange}
      >
       
       <option value="titleAsc">Title A–Z</option>
       <option value="titleDesc">Title Z–A</option>
       <option value="launchDateDesc">Launched (Newest)</option>
      </select>
      
    </div>
  );
};