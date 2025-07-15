"use client"

import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "i18n/navigation";
import * as studyCreationAction from "actions/studyCreationAction";
import StateSchema from "reducers/StateSchema";
import {useTranslations} from "next-intl";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function Page() {
  const t = useTranslations("CreateStudyPage");
  const router = useRouter();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [titleSuggestion, setTitleSuggestion] = React.useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  // State
  const title = useSelector((state: StateSchema) => (state.studyCreation.title));
  const description = useSelector((state: StateSchema) => (state.studyCreation.description));
  const sortType = useSelector((state: StateSchema) => state.studyCreation.sortType);
  const existingStudies = useSelector((state: StateSchema) => state.studies.studies);
  const existingTitles = existingStudies?.map((s) => s.title.toLowerCase()) || [];


  // Dispatch
  const dispatch = useDispatch();

  function UniqueTitle(baseTitle: string, existingTitles: string[]): string {
    let suggestion = baseTitle;
    let counter = 2;
  
    while (existingTitles.includes(suggestion.toLowerCase())) {
      suggestion = `${baseTitle} (${counter})`;
      counter++;
    }
  
    return suggestion;
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTitleError(false);
    const suggestedNew = UniqueTitle(value, existingTitles);
    setTitleSuggestion(suggestedNew !== value ? suggestedNew : null);
    dispatch(studyCreationAction.changeTitle({title: suggestedNew}));
  }

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescriptionError(false);
    dispatch(studyCreationAction.changeDescription({description: value}));
  }

  const onNextPage = () => {
    // Check for errors
    if (!title || title.length === 0) {
      setTitleError(true);
      return;
    }
    if (!description || description.length === 0) {
      setDescriptionError(true);
      return;
    }

    router.push("/create/add-cards");
  }


  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 

      if (e.target === titleInputRef.current) {
        descriptionInputRef.current?.focus();
      }
    }
  };

  return (
    <div className='study-creation-page'>
      <h1>{t("title")}</h1>
      <h2>{t("basic information")}</h2>

      <form>
        <div className="input-with-error">
          <input
            ref={titleInputRef}
            type='text'
            placeholder={t("study title")}
            defaultValue={title}
            onChange={onTitleChange}
            onKeyDown={handleEnterKey} 
          />
          {titleError && <Alert severity="error">{t("error empty field")}</Alert>}
          {titleSuggestion && <Alert severity="info">{t("duplicate study title")} {titleSuggestion}</Alert>}
        </div>
        <div className="input-with-error">
          <textarea
            ref={descriptionInputRef}
            placeholder={t("study description")}
            defaultValue={description}
            rows={10}
            cols={30}
            onChange={onDescriptionChange}
          ></textarea>
          {descriptionError && <Alert severity="error">{t("error empty field")}</Alert>}
        </div>
        <div className="sort-type-section">
          <label className="sort-type-label"><strong>{t("sort type")}</strong></label>
          <div className="sort-type-options">
            <label className="sort-type-option">
             <input
               type="radio"
               value="open"
               checked={sortType === "open"}
               onChange={() => dispatch(studyCreationAction.changeSortType({ sortType: "open" }))}
             />
             <span><strong>{t("open")}</strong> {t("open description")}</span>
            </label>

            <label className="sort-type-option">
             <input
              type="radio"
              value="closed"
              checked={sortType === "closed"}
              onChange={() => dispatch(studyCreationAction.changeSortType({ sortType: "closed" }))}
             />
             <span><strong>{t("closed")}</strong> {t("closed description")}</span>
            </label>
            
            <label className="sort-type-option">
             <input
              type="radio"
              value="hybrid"
              checked={sortType === "hybrid"}
              onChange={() => dispatch(studyCreationAction.changeSortType({ sortType: "hybrid" }))}
             />
            <span><strong>{t("hybrid")}</strong>{t("hybrid description")}</span>
           </label>
        </div>
      </div>
      </form>

      <div className="bottom-container">
        <div className="btn-container">
          <Button aria-label="Next step" variant="contained" onClick={onNextPage}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
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
