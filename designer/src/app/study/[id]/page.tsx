"use client"

import BarGraph from "elements/visualisations/BarGraph";
import DataTable from "elements/visualisations/DataTable";
import React from "react";
import L from "localization/LocalizedText";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";

// Default page is the participants page
export default function Page() {

  // State
  const percentage = useSelector((state: StateSchema) => state.study.participants.completion);
  const sub = useSelector((state: StateSchema) => state.study.participants.completed);
  const total = useSelector((state: StateSchema) => state.study.participants.total);
  const data = useSelector((state: StateSchema) => state.study.participants.data);

  return (
    <div className="content">
      {
        <BarGraph percentage={percentage}
                  sub={sub}
                  total={total}
                  entity={L?.text?.users}
                  title={L?.text?.completion}
                  action={L?.text?.completedTheStudy}
        />
      }
      <DataTable headers={[L?.text?.participantNo, L?.text?.timeTaken, L?.text?.cardsSorted, L?.text?.categoriesCreated]}
                 data={data} />
    </div>
  );
}