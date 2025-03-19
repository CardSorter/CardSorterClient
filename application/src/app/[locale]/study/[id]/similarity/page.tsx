"use client"

import SimilarityMatrix from "elements/visualisations/SimilarityMatrix";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as studyAction from "actions/studyPageAction";


export default function Page() {

  // State
  const similarityMatrix = useSelector((state: StateSchema) =>  state.study.similarityMatrix);
  const selectedCards = useSelector((state: StateSchema) => state.study.selectedCards);


  // Dispatch
  const dispatch = useDispatch();

  const similarityHover = (row: number, column: number) =>
    dispatch(studyAction.changeHoveredCards({index1: row, index2: column}));


  return (
    <SimilarityMatrix data={similarityMatrix} onHover={similarityHover} selected={selectedCards || []} />
  );
}