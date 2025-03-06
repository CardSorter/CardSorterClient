"use client"

import BarGraph from "elements/visualisations/BarGraph";
import DataTable from "elements/visualisations/DataTable";
import React from "react";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import L from "localization/LocalizedText";

export default function Page() {

  // State
  const percentage = useSelector((state: StateSchema) => state.study.cards.average);
  const sub = useSelector((state: StateSchema) => state.study.cards.sorted);
  const total = useSelector((state: StateSchema) => state.study.cards.total);
  const data = useSelector((state: StateSchema) => state.study.cards.data);

  return (
    <div className="content">
      {
        <BarGraph percentage={percentage}
                  sub={sub}
                  total={total}
                  entity={L?.text?.cards}
                  title={L?.text?.averageSort}
                  action={L?.text?.wereSorterInAverage}
        />
      }
      <DataTable headers={[L?.text?.card, L?.text?.categoriesNo, L?.text?.categories, L?.text?.frequency, L?.text?.description]}
                 data={data.map(item => [item.name, item.categories_no, item.category_names, item.frequencies, item.description])} />
    </div>
  );
}