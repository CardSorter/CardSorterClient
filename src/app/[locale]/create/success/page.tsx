"use client"

import React, {useEffect} from 'react';

import Image from "next/image";
import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import {useRouter} from "i18n/navigation";
import copyToClipboard from "utils/copyToClipboard";
import {useTranslations} from "next-intl";

export default function Page() {
  const t = useTranslations("CreateStudyPage");
  const router = useRouter();

  // State
  const createdStudy = useSelector((state: StateSchema) => (state.studyCreation.createdStudy))

  const onCopy = () => {
    copyToClipboard(process.env.NEXT_PUBLIC_BASE_URL + `/sort/${createdStudy?.id}`);
  }

  const onButtonClick = () => {
    router.push(`/study/${createdStudy?.id}`)
  }

  useEffect(() => {
    // Redirect to previous step if study not yet sent
    if (!createdStudy?.id) {
      router.push("/create/final");
    }
  }, [router, createdStudy?.id]);

  return (
    <div className="success-page">
      <h1>{t("study created")}</h1>
      <Image src={"/card-sorter/images/success.svg"} alt={"Study Created"} height={150} width={150} />
      <div className="actions-container">
        <div className="button-container">
          <button onClick={onButtonClick}>{t("go to study")}</button>
        </div>
        <div className="share-container">
          <div className="url-container">
            <a className="url" href={`/sort/${createdStudy?.id}`} target="_blank">
              {process.env.NEXT_PUBLIC_BASE_URL + `/sort/${createdStudy?.id}`}
            </a>
            <button className="copy" type="button" onClick={onCopy}>
              <span className="material-symbols-outlined">content_copy</span>
            </button>
          </div>
          <p>{t("share url")}</p>
        </div>
      </div>
    </div>
  );
};
