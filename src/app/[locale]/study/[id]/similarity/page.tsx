"use client"

import SimilarityMatrix from "elements/visualisations/SimilarityMatrix/SimilarityMatrix";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as studyAction from "actions/studyPageAction";


export default function Page() {

  // State
  const similarityMatrix = useSelector((state: StateSchema) =>  state.study.similarityMatrix);

  // Dispatch
  const dispatch = useDispatch();

  return (
    <SimilarityMatrix data={similarityMatrix} />
  );
}