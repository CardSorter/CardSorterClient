"use client"

import React, {ChangeEvent, useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as studyCreationAction from "actions/studyCreationAction";
import * as ActionStatus from 'actions/ActionStatus';
import {Dispatch} from "@reduxjs/toolkit";
import {useRouter} from "i18n/navigation";
import {createStudy} from "actions/studyCreationAction";
import {useTranslations} from "next-intl";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function Page() {
  const t = useTranslations("CreateStudyPage");
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(false);

  // State
  const message = useSelector((state: StateSchema) => (state.studyCreation.thanksMessage));
  const studyTitle = useSelector((state: StateSchema) => state.studyCreation.title);
  const studyDescription = useSelector((state: StateSchema) => state.studyCreation.description);
  const studyCards = useSelector((state: StateSchema) => state.studyCreation.cards);
  const studyMessage = useSelector((state: StateSchema) => state.studyCreation.thanksMessage);
  const link = useSelector((state: StateSchema) => state.studyCreation.externalSurveyLink);
  const studySendingStatus = useSelector((state: StateSchema) =>
    (state.studyCreation.ui.studySendingStatus));
  const sortType = useSelector((state: StateSchema) => state.studyCreation.sortType);
  const categories = useSelector((state: StateSchema) => state.studyCreation.categories);
  const currentPage = (sortType === "open") ? 3 : 4;
  const totalSteps = (sortType === "open") ? 3 : 4;


  // Dispatch
  const dispatch: Dispatch<any> = useDispatch();

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setErrorMessage(false); // Clear errors
    dispatch(studyCreationAction.changeThanksMessage({message: e.target.value}));
  }

  const onLink = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(studyCreationAction.changeExternalSurveyLink({link: e.target.value}));
  }

  const onNext = () => {

    // Check for errors
    if (!studyMessage || studyMessage.length === 0) {
      setErrorMessage(true);
      return;
    }
    const categoryMap: Record<string, string> = {};
    Object.values(categories).forEach((cat) => {
      categoryMap[cat.id] = cat.name;
    });
    const sanitizedLink = (link && link.trim() !== "" && link !== "undefined") ? link.trim() : "";


    dispatch(studyCreationAction.sendStudy({
      title: studyTitle || "",
      description: studyDescription || "",
      cards: studyCards,
      message: studyMessage,
      sortType: sortType || "open",
      categories: categoryMap,
      link: sanitizedLink,

    }));
  }

  const onPrev = () => {
    if (sortType === "open") {
      router.push("/create/add-cards");
    } else {
      router.push("/create/add-categories");
    }
  };
  

  useEffect(() => {
    if(studySendingStatus === ActionStatus.SUCCESS) {
      // Clear fetching status from local storage
      dispatch(createStudy({status: undefined, error: false}));
      // Redirect to success page
      router.push("/create/success");
    }
  }, [studySendingStatus])

  useEffect(() => {
    // Redirect to previous step if items not filled
    if (Object.values(studyCards).length === 0 && studySendingStatus !== ActionStatus.SUCCESS && studySendingStatus !== ActionStatus.IS_FETCHING) {
      router.push("/create/add-cards");
    }
  }, [router, studyCards]);


  return (
    <div className="study-creation-page">
      <h1>{t("title")}</h1>
      <h2>{t("message")}</h2>

      <form>
        <textarea className='userForm' cols={30} rows={5} onChange={(e) => onLink(e)}
          placeholder={t("external survey")}>
        </textarea>
        <textarea className="thanks message" cols={30} rows={10}
          onChange={(e) => onMessageChange(e)}
          placeholder={t("thanks message")}
          defaultValue={message}>
        </textarea>
        {
          errorMessage &&
            <Alert severity="error">{t("error empty field")}</Alert>
        }
      </form>

      <div className="bottom-container">

        <div className="btn-container">
          <Button aria-label="Previous step" variant="outlined" onClick={onPrev} disabled={studySendingStatus === ActionStatus.IS_FETCHING}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Button>
          <Button aria-label="Create study" variant="contained" onClick={onNext} loading={studySendingStatus === ActionStatus.IS_FETCHING}>
            {t("create")}
          </Button>
        </div>
        <div className="page-no-container">
          <p>{currentPage}</p>
          <p>{t("of")}</p>
          <p>{totalSteps}</p>
        </div>
      </div>
    </div>
  );
}