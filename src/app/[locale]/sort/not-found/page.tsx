import React from "react";

import MessageScreen from "elements/sorting/MessageScreen";
import {useTranslations} from "next-intl";

export default function NotFound() {
  const t = useTranslations("SortingPage");

  return (
    <MessageScreen message={t("study not found")} success={false} />
  )
}