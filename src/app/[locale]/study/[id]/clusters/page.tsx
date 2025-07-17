"use client"

import Dendrogram from "elements/visualisations/Dendrogram/Dendrogram";
import React from "react";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";


export default function Page() {

  // State
  const clusters = useSelector((state: StateSchema) => state.study.clusters);
  const clustersFetching = useSelector((state: StateSchema) => state.study.clustersFetching);


  return (
    <Dendrogram data={clusters} fetching={clustersFetching} />
  )
}