"use client"

import BarGraph from "elements/visualisations/BarGraph";
import DataTable from "elements/visualisations/DataTable/DataTable";
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
      .filter(cat => Number(cat[5]) === 1)        // cat[5] is the predefined flag
      .map(cat => typeof cat[0] === "string" ? cat[0].trim().toLowerCase() : "")         
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
              const isPredefined = predefinedSet.has(name?.trim().toLowerCase());
              console.log("Checking if", name?.trim(), "is predefined:", isPredefined);
              return (
               <div key={idx}>
                <span
                 style={{
                  color: isPredefined ? "orange" : "inherit",
                  fontWeight: isPredefined ? "bold" : "normal",
                }}
                >
                 {name}
                </span>

               </div>
             );
            })
            }
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
