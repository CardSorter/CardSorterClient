"use client"

import BarGraph from "elements/visualisations/BarGraph";
import DataTable from "elements/visualisations/DataTable";
import React from "react";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import L from "localization/LocalizedText";

export default function Page() {

  // State
  const percentage = useSelector((state: StateSchema) => state.study.categories.similarity);
  const sub = useSelector((state: StateSchema) => state.study.categories.similar);
  const total = useSelector((state: StateSchema) => state.study.categories.total);
  const data = useSelector((state: StateSchema) => state.study.categories.data);

  return (
    <div className="content">
      {
        <BarGraph percentage={percentage}
                  sub={sub}
                  total={total}
                  entity={L?.text?.categories}
                  title={L?.text?.similarity}
                  action={L?.text?.couldBeMergedInto}
        />
      }
      <DataTable headers={[L?.text?.category, L?.text?.cardsNo, L?.text?.cards, L?.text?.frequency, L?.text?.participants]}
                 data={data} />
    </div>
  );
}