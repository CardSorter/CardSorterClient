"use client";

import React from "react";
import GamifiedMessageScreen from "elements/sorting/GamifiedMessageScreen";
import StateSchema from "reducers/StateSchema";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import { playSound } from "utils/audio/sounds";

export default function page() {
  const t = useTranslations("SortingPage");

  // State
  const thanksMessage = useSelector(
    (state: StateSchema) => state.sortingUi.thanksMessage,
  );
  const link = useSelector((state: StateSchema) => state.sortingUi.link);

  const categories = useSelector(
    (state: StateSchema) => state.sortingBoard.categories,
  );
  playSound("finishh");

  return (
    <GamifiedMessageScreen
      message={thanksMessage || ""}
      link={link}
      success={true}
      subMessage={`(${t("you can close this tab")})`}
      results={categories}
    />
  );
}
