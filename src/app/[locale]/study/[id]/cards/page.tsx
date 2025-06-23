"use client"

import BarGraph from "elements/visualisations/BarGraph";
import DataTable from "elements/visualisations/DataTable";
import React from "react";
import { useSelector } from "react-redux";
import StateSchema from "reducers/StateSchema";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("StudyPage");

  // Redux state selectors
  const percentage = useSelector((state: StateSchema) => state.study.cards.average);
  const sub = useSelector((state: StateSchema) => state.study.cards.sorted);
  const total = useSelector((state: StateSchema) => state.study.cards.total);
  const data = useSelector((state: StateSchema) => state.study.cards.data);
  const categories = useSelector((state: StateSchema) => state.study.categories.data);

  
  const predefinedSet = new Set(
    categories
      .filter(cat => cat[5] === 1)        // cat[1] is the predefined flag
      .map(cat => cat[0]?.trim())         
  );

  return (
    <div className="content">
      <BarGraph
        percentage={percentage}
        sub={sub}
        total={total}
        entity={t("cards")}
        title={t("average sort")}
        action={t("were sorted in average")}
      />

      <DataTable
        headers={[t("card"), t("categories no"), t("categories"), t("frequency"), t("description")]}
        data={data.map(item => [
          item.name,
          item.categories_no,
          <div>
            {item.category_names.map((name, idx) => {
              const isPredefined = predefinedSet.has(name?.trim());
              return (
               <div
                 key={idx}
                style={{
                  color: isPredefined ? "orange" : "inherit",
                  fontWeight: isPredefined ? "bold" : "normal",
                }}
              >
                {name}
              </div>
             );
            })}
          </div>,
          <div>
            {item.frequencies.map((freq, idx) => (
              <div key={idx}>{freq}</div>
            ))}
          </div>,
          item.description
        ])}
      />
    </div>
  );
}
