import React from "react";

import GamifiedMessageScreen from "elements/sorting/GamifiedMessageScreen";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("SortingPage");

  return (
    <GamifiedMessageScreen
      message={t("study not found")}
      success={false}
      results={null}
    />
  );
}
