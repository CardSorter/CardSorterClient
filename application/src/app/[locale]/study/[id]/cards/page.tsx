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
                  entity={t("cards")}
                  title={t("average sort")}
                  action={t("were sorted in average")}
        />
      }
      <DataTable headers={[t("card"), t("categories no"), t("categories"), t("frequency"), t("description")]}
                 data={data.map(item => [item.name, item.categories_no, item.category_names, item.frequencies, item.description])} />
    </div>
  );
}