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

  // Dispatch
  const dispatch = useDispatch();

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


  return (
    <div className="filter-container">
      <button className={!filteredBy? "active" : ""} onClick={onAllClick}>{t("filters all")}</button>
      <button className={(filteredBy === "active"? "active" : "")} onClick={onOngoingClick}>{t("filters ongoing")}</button>
      <button className={(filteredBy === "inactive"? "active" : "")} onClick={onInactiveClick}>{t("filters completed")}</button>
    </div>
  );
};