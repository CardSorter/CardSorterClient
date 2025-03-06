"use client"

import React, {useEffect, useState} from 'react';

import L from 'localization/LocalizedText';
import {usePathname, useRouter} from "next/navigation";

const StudyMenu: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
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
        navigationPath = "/clusters";
        break
    }

    setSelectedItem(item_no);
    router.push(`/${studyBasePath[1]}/${studyBasePath[2]}/${navigationPath}`);
  }

  return (
    <div className="study-menu">
      <button className={(selectedItem == 0) ? "selected" : ""} onClick={() => onItemClicked(0)}>{L?.text?.participant}</button>
      <button className={(selectedItem == 1) ? "selected" : ""} onClick={() => onItemClicked(1)}>{L?.text?.sorting}</button>
      <button className={(selectedItem == 2) ? "selected" : ""} onClick={() => onItemClicked(2)}>{L?.text?.cards}</button>
      <button className={(selectedItem == 3) ? "selected" : ""} onClick={() => onItemClicked(3)}>{L?.text?.categories}</button>
      <button className={(selectedItem == 4) ? "selected" : ""} onClick={() => onItemClicked(4)}>{L?.text?.similarityMatrix}</button>
      <button className={(selectedItem == 5) ? "selected" : ""} onClick={() => onItemClicked(5)}>{L?.text?.clusters}</button>
    </div>);
};

export default StudyMenu;
