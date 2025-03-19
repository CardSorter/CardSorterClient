"use client"

import BarGraph from "elements/visualisations/BarGraph";
import DataTable from "elements/visualisations/DataTable";
import React from "react";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import {useTranslations} from "next-intl";

// Default page is the participants page
export default function Page() {
  const t = useTranslations("StudyPage");

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
                  entity={t("users")}
                  title={t("completion")}
                  action={t("completed the study")}
        />
      }
      <DataTable headers={[t("participant no"), t("time taken"), t("cards sorted"), t("categories created")]}
                 data={data} />
    </div>
  );
}