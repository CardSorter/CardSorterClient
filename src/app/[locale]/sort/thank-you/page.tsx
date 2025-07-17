"use client"

import React from "react";
import MessageScreen from "elements/sorting/MessageScreen";
import StateSchema from "reducers/StateSchema";
import {useSelector} from "react-redux";
import {useTranslations} from "next-intl";

export default function page() {
  const t = useTranslations("SortingPage");

  // State
  const thanksMessage = useSelector((state: StateSchema) => state.sortingUi.thanksMessage);
  const link = useSelector((state: StateSchema) => state.sortingUi.link);

  return (
    <MessageScreen
      message={thanksMessage || ""}
      link={link}
      success={true}
      subMessage={`(${t("you can close this tab")})`}
    />
  )
}