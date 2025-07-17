"use client"

import React, {useEffect} from 'react';

import {useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import {useRouter} from "i18n/navigation";
import copyToClipboard from "utils/copyToClipboard";
import {useTranslations} from "next-intl";
import Button from '@mui/material/Button';
import InputWithCopy from "../../../../elements/InputWithCopy/InputWithCopy";

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
      <h1>{createdStudy?.title}</h1>

      <div className="success-ribbon">
        <span className="material-symbols-outlined">check_circle</span>
        <p>{t("study created")}</p>
      </div>

      <InputWithCopy inputText={`${process.env.NEXT_PUBLIC_BASE_URL}/sort/${createdStudy?.id}`} title={t("share url")} />

      <div className="button-container">
        <Button variant="contained" onClick={onButtonClick} size="large">{t("go to study")}</Button>
      </div>
    </div>
  );
};
