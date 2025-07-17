"use client"

import BarGraph from "elements/visualisations/BarGraph";
import DataTable from "elements/visualisations/DataTable/DataTable";
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
  const sortType = useSelector((state: StateSchema) => state.sortingUi?.sortType ?? 'open');



  let headers;

      if (sortType === "closed") {
         headers = [t("participant no"), t("time taken"), t("cards sorted"), t("predefined categories")];
      } else if (sortType === "hybrid") {
         headers = [t("participant no"), t("time taken"), t("cards sorted"), t("all categories")];
      } else {
        headers = [t("participant no"), t("time taken"), t("cards sorted"), t("categories created")];
      }
      



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

      <DataTable headers={headers} data={data} />

    </div>
  );
}