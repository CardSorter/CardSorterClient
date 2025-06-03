"use client"

import React, {ChangeEvent, useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as studyCreationAction from "actions/studyCreationAction";
import * as ActionStatus from 'actions/ActionStatus';
import {Dispatch} from "@reduxjs/toolkit";
import {useRouter} from "i18n/navigation";
import {createStudy} from "actions/studyCreationAction";
import {useTranslations} from "next-intl";

export default function Page() {
  const t = useTranslations("CreateStudyPage");
  const router = useRouter();

  // State
  const message = useSelector((state: StateSchema) => (state.studyCreation.thanksMessage));
  const studyTitle = useSelector((state: StateSchema) => state.studyCreation.title);
  const studyDescription = useSelector((state: StateSchema) => state.studyCreation.description);
  const studyCards = useSelector((state: StateSchema) => state.studyCreation.cards);
  const studyMessage = useSelector((state: StateSchema) => state.studyCreation.thanksMessage);
  const link = useSelector((state: StateSchema) => state.studyCreation.externalSurveyLink);
  const errorMessage = useSelector((state: StateSchema) =>
    (state.studyCreation.errorMessage));
  const studySendingStatus = useSelector((state: StateSchema) =>
    (state.studyCreation.ui.studySendingStatus));
  const sortType = useSelector((state: StateSchema) => state.studyCreation.sortType);
  const categories = useSelector((state: StateSchema) => state.studyCreation.categories);
  const currentPage = (sortType === "open") ? 3 : 4;
  const totalSteps = (sortType === "open") ? 3 : 4;


  // Dispatch
  const dispatch: Dispatch<any> = useDispatch();

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(studyCreationAction.toggleThanksError({status: false})); // Clear errors
    dispatch(studyCreationAction.changeThanksMessage({message: e.target.value}));
  }

  const onLink = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(studyCreationAction.changeExternalSurveyLink({link: e.target.value}));
  }

  const onNext = () => {

    // Check for errors
    if (!studyMessage || studyMessage.length === 0) {
      dispatch(studyCreationAction.toggleThanksError({status: true}));
      setTimeout(() => studyCreationAction.toggleThanksError({status: false}), 5000);
      return;
    }
    const categoryMap: Record<string, string> = {};
    Object.values(categories).forEach((cat) => {
      categoryMap[cat.id] = cat.name;
    });


    dispatch(studyCreationAction.sendStudy({
      title: studyTitle || "",
      description: studyDescription || "",
      cards: studyCards,
      message: studyMessage,
      sortType: sortType || "open",
      categories: categoryMap,
      link: link,
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
    <div className="study-creation-card">
      <h1>{t("title")}</h1>
      <h2>{t("message")}</h2>

      <form>
        <div className="error-holder">
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
            <div className="error-message"><p>{t("error empty field")}</p></div>
          }
        </div>
      </form>

      <div className="bottom-container">

        <div className="btn-container">
          <button className="prev" onClick={onPrev} disabled={studySendingStatus === ActionStatus.IS_FETCHING}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="create" onClick={onNext}  disabled={studySendingStatus === ActionStatus.IS_FETCHING}>
            {
              studySendingStatus === ActionStatus.IS_FETCHING &&
                <span>{t("creating study")}</span>
            }
            {
              studySendingStatus !== ActionStatus.IS_FETCHING &&
                t("create")
            }
          </button>
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