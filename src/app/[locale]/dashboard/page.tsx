"use client"

import Filters from "elements/Filters";
import StudiesList from "elements/StudiesList";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStudies } from "actions/studiesAction";
import { useSelector } from 'react-redux';
import StateSchema from 'reducers/StateSchema';

export default function Page() {
  const token = useSelector((state: StateSchema) => state.auth.token);
  const dispatch = useDispatch<any>();
  

  // Update immediately the dashboard after the creation of a study
  useEffect(() => {
    if (!token) return;
    dispatch(fetchStudies());
  
}, [dispatch, token]);
if (!token) {
    return null; 

  } 

  return (
      <>
        <Filters />
        <StudiesList />
      </>
  )
}
