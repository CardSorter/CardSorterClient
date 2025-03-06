"use client"

import DataTableSorting from "elements/visualisations/DataTableSorting";
import React from "react";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import L from "localization/LocalizedText";

export default function Page() {

  // State
  const data = useSelector((state: StateSchema) => state.study.sorting.data);

  return (
    <div className='sorting'>
        <DataTableSorting headers={[L?.text?.participantNo, L?.text?.categories, L?.text?.cards, L?.text?.comments]}
                          data={data} />
    </div>
  );
}