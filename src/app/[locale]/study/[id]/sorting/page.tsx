"use client"

import DataTableSorting from "elements/visualisations/DataTableSorting";
import React from "react";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import {useTranslations} from "next-intl";

export default function Page() {
  const t = useTranslations("StudyPage");
   

  // State
  const data = useSelector((state: StateSchema) => state.study.sorting.data);

  

  return (
    <div className='sorting'>
        <DataTableSorting headers={[t("participant no"), t("categories"), t("cards"), t("comments")]}
                          data={data} />
    </div>
  );
}