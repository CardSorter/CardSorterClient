"use client"

import React, {useEffect, useState} from 'react';

import {usePathname, useRouter} from "i18n/navigation";
import {useTranslations} from "next-intl";
import { useSelector } from "react-redux";
import StateSchema  from "reducers/StateSchema";
import styles from "./StudyMenu.module.scss";

const StudyMenu: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("StudyPage");
  const sortType = useSelector((state: StateSchema) => state.sortingUi.sortType);

  
  const [selectedItem, setSelectedItem] = useState(0);

  // Figure out selected item on page load
  useEffect(() => {
    const path = pathname.split("/");
    switch (path[path.length - 1]) {
      case "sorting":
        setSelectedItem(1);
        break
      case "cards":
        setSelectedItem(2);
        break
      case "categories":
        setSelectedItem(3);
        break
      case "similarity":
        setSelectedItem(4);
        break
      case "clusters":
        setSelectedItem(5);
        break
      default:
        setSelectedItem(0);
    }
  }, []);

  function onItemClicked(item_no: number) {
    const studyBasePath = pathname.split("/");

    let navigationPath = "";
    switch (item_no) {
      case 0:
        navigationPath = "";
        break
      case 1:
        navigationPath = "/sorting";
        break
      case 2:
        navigationPath = "/cards";
        break
      case 3:
        navigationPath = "/categories";
        break
      case 4:
        navigationPath = "/similarity";
        break
      case 5:
        navigationPath = sortType === "closed" ? "/frequencymatrix" : "/clusters";
        break
    }

    setSelectedItem(item_no);
    router.push(`/${studyBasePath[1]}/${studyBasePath[2]}/${navigationPath}`);
  }

  return (
    <div className={styles.studyMenu}>
      <button className={(selectedItem == 0) ? styles.selected : ""} onClick={() => onItemClicked(0)}>{t("participant")}</button>
      <button className={(selectedItem == 1) ? styles.selected : ""} onClick={() => onItemClicked(1)}>{t("sorting")}</button>
      <button className={(selectedItem == 2) ? styles.selected : ""} onClick={() => onItemClicked(2)}>{t("cards")}</button>
      <button className={(selectedItem == 3) ? styles.selected : ""} onClick={() => onItemClicked(3)}>{t("categories")}</button>
      <button className={(selectedItem == 4) ? styles.selected : ""} onClick={() => onItemClicked(4)}>{t("similarity matrix")}</button>
      <button className={(selectedItem == 5) ? styles.selected : ""} onClick={() => onItemClicked(5)}>{sortType === "closed" ? t("placement frequency matrix") : t("clusters")}</button>
    </div>);
};

export default StudyMenu;
