"use client"

import BarGraph from "elements/visualisations/BarGraph";
import DataTable from "elements/visualisations/DataTable";
import React from "react";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import {useTranslations} from "next-intl";

export default function Page() {
  const t = useTranslations("StudyPage");

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
                  entity={t("categories")}
                  title={t("similarity")}
                  action={t("could be merged into")}
        />
      }
      <DataTable headers={[t("category"), t("cards no"), t("cards"), t("frequency"), t("participants")]}
                 data={data} />
    </div>
  );
}