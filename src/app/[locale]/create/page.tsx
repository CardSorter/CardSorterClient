"use client"

import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "i18n/navigation";

import * as studyCreationAction from "actions/studyCreationAction";
import StateSchema from "reducers/StateSchema";
import {useTranslations} from "next-intl";

export default function Page() {
  const t = useTranslations("CreateStudyPage");

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // State
  const title = useSelector((state: StateSchema) => (state.studyCreation.title));
  const description = useSelector((state: StateSchema) => (state.studyCreation.description));
  const titleError = useSelector((state: StateSchema) => (state.studyCreation.errorTitle));
  const descriptionError = useSelector((state: StateSchema) => (state.studyCreation.errorDescription));

  // Dispatch
  const dispatch = useDispatch();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(studyCreationAction.toggleTitleError({status: false}));
    dispatch(studyCreationAction.changeTitle({title: value}));
  }

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    dispatch(studyCreationAction.toggleDescriptionError({status: false}));
    dispatch(studyCreationAction.changeDescription({description: value}));
  }

  const onNextPage = () => {
    // Check for errors
    if (!title || title.length === 0) {
      dispatch(studyCreationAction.toggleTitleError({status: true}));
      setTimeout(() => studyCreationAction.toggleTitleError({status: false}),
        5000);
      return;
    }
    if (!description || description.length === 0) {
      dispatch(studyCreationAction.toggleDescriptionError({status: true}));
      setTimeout(() => studyCreationAction.toggleDescriptionError({status: false}),
        5000);
      return;
    }

    router.push("/create/add-cards");
  }


  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default Enter behavior (form submission)

      if (e.target === titleInputRef.current) {
        descriptionInputRef.current?.focus();
      }
    }
  };

  return (
    <div className='study-creation-card'>
      <h1>{t("title")}</h1>
      <h2>{t("basic information")}</h2>

      <form>
        <div className="error-holder">
          <input
            ref={titleInputRef}
            type='text'
            placeholder={t("study title")}
            defaultValue={title}
            onChange={onTitleChange}
            onKeyDown={handleEnterKey} // Handle Enter key here
          />
          {titleError && <div className="error-message"><p>{t("error empty field")}</p></div>}
        </div>
        <div className="error-holder">
          <textarea
            ref={descriptionInputRef}
            placeholder={t("study description")}
            defaultValue={description}
            rows={10}
            cols={30}
            onChange={onDescriptionChange}
          ></textarea>
          {descriptionError && <div className="error-message"><p>{t("error empty field")}</p></div>}
        </div>
      </form>
      <div className="bottom-container">
        <div className="btn-container">
          <button className="prev disabled"></button>
          <button className="next" onClick={onNextPage}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="page-no-container">
          <p>1</p>
          <p>{t("of")}</p>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};
