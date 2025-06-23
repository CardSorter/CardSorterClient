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
                 data={data.map(cat => [
             <div
               key={cat[0]}
               style={{
               color: cat[5] === 1 ? "orange" : "inherit",    // check if predefined categories cat[5] is true(1)
               fontWeight: cat[5] === 1 ? "bold" : "normal",
              }}
             >
             {cat[0]}
            </div>,
            cat[1], // cards no
            <div>
             {cat[2].map((card: string, idx: number) => (
              <div key={idx}>{card}</div>
             ))}
             </div>,
             <div>
              {cat[3].map((freq: number, idx: number) => (
               <div key={idx}>{freq}</div>
              ))}
               </div>,
              cat[4] // participants
              ])}
             />
            </div>
           );
}