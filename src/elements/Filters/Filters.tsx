"use client"

import React, {useEffect, useState} from 'react';
import {useTranslations} from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as studiesActions from "actions/studiesAction";
import styles from './Filters.module.scss';

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

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>){
    setSearchTerm(e.target.value);
    dispatch(studiesActions.setSearchTerm(e.target.value));
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSortOption(value);
    dispatch(studiesActions.setSortOption(value));
  }

  const handleFilterChange = (event: React.SyntheticEvent, newValue: "all" | "active" | "inactive") => {
    dispatch(studiesActions.setStudyFilter({filter: newValue}));
  };


  return (
    <div className={styles.filterContainer}>
      <Tabs value={filteredBy} onChange={handleFilterChange} aria-label="basic tabs example">
        <Tab label={t("filters all")} value="all" />
        <Tab label={t("filters ongoing")} value="active" />
        <Tab label={t("filters completed")} value="inactive" />
      </Tabs>

    <div className={styles.searchContainer}><img src="/card-sorter/images/search-icon.png" alt="Remote Icon" />
     
      <input
        type="text"
        className={styles.searchInput}
        placeholder={t("searchbar")}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div>
      <select
       className={styles.sortDropdown}
       value={sortOption}
       onChange={handleSortChange}
      >
       
       <option value="titleAsc">{t("title a-z")}</option>
       <option value="titleDesc">{t("title z-a")}</option>
       <option value="launchDateDesc">{t("launched")}</option>
      </select>
      
    </div>
  );
};