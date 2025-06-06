"use client"

import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useRouter} from "i18n/navigation";

import StateSchema from "reducers/StateSchema";
import {useDispatch, useSelector} from "react-redux";
import * as studyCreationAction from "actions/studyCreationAction";
import type {Card} from "reducers/studyCreationReducer";
import {useTranslations} from "next-intl";

interface CardProps {
  name: string;
  description: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({name, description, onNameChange, onDescriptionChange, onDelete}) => {
  const t = useTranslations("CreateStudyPage");

  return(
    <div className="card">
      <input
        type="text"
        placeholder={t("card name")}
        defaultValue={name}
        onChange={(e) => onNameChange(e)}
      />
      <input
        type="text"
        placeholder={t("card description")}
        defaultValue={description}
        onChange={(e) => onDescriptionChange(e)}
        title={description}
        
      />
      <button type="button" onClick={onDelete}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}

export default function Page()  {
  const t = useTranslations("CreateStudyPage");

  const addCardsRef = useRef<HTMLInputElement>(null);
  const [cardCount, setCardCount] = useState<number>(0);
  const router = useRouter();

  // State
  const title = useSelector((state: StateSchema) => state.studyCreation.title);
  const cards = useSelector((state: StateSchema) => (state.studyCreation?.cards));
  const errorCards = useSelector((state: StateSchema) => state.studyCreation.errorCards);
  const errorDuplicates = useSelector((state: StateSchema) => state.studyCreation.errorDuplicate);
  const sortType = useSelector((state: StateSchema) => state.studyCreation.sortType);
  const totalSteps = (sortType === "open") ? 3 : 4;



  // Dispatch
  const dispatch = useDispatch();

  const onCreateXCards = () => {
    dispatch(studyCreationAction.addXCards({no: parseInt(addCardsRef?.current?.value || "")}));
  }

  const onCardNameChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    dispatch(studyCreationAction.toggleCardError({status: false}));
    dispatch(studyCreationAction.toggleCardDuplicate({status: false}));

    const name = event.target.value;
    dispatch(studyCreationAction.changeCardName({id, name}));
  }

  const onCardDescriptionChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
      const description = event.target.value;
      dispatch(studyCreationAction.changeCardDescription({id, description}));
  }

  const onDeleteCard = (id: number) => {
    dispatch(studyCreationAction.deleteCard({id}));
  }

  const onNext = () => {
    let hasErrors = false; // Initialize error flag

    // Check for errors
    Object.values(cards).forEach((card, index) => {
      if (!card.name || card.name.length === 0) {
        hasErrors = true; // Set the flag to true
      }
    });

    // If any errors were found, don't proceed
    if (hasErrors) {
      dispatch(studyCreationAction.toggleCardError({status: true}));
      setTimeout(() => studyCreationAction.toggleCardError({status: false}), 5000);
      return;
    }

    const cardNames =  Object.values(cards).map((card) => card.name?.trim().toLowerCase());
    const duplicateCardNames = new Set();
    const seenCardNames = new Set();

    for (const cardName of cardNames) {
      if (seenCardNames.has(cardName)) {
        duplicateCardNames.add(cardName);
      } else {
        seenCardNames.add(cardName);
      }
    }
    if (duplicateCardNames.size > 0) {
      dispatch(studyCreationAction.toggleCardDuplicate({status: true}));
      setTimeout(() => studyCreationAction.toggleCardDuplicate({status: false}), 5000);
      return;
    }

    if (sortType === "closed" || sortType === "hybrid") {
      router.push("/create/add-categories");
    } else {
      router.push("/create/final");
    }
  }

  const onPrev = () => {
    router.push("/create");
  }

  useEffect(() => {
    // Redirect to previous step if items not filled
    if (!title) {
      router.push("/create");
    }
  }, [router, title]);

  return (
    <div className="study-creation-card">
      <h1>{t("title")}</h1>
      <h2>{t("total cards")}{cardCount} </h2>

      <form className="cards">
        <div className="error-holder">
          <div className="card-container">
            { cards && Object.values(cards).map((card) => (
              <Card
                key={'card' + card.id}
                name={card.name || ""}
                description={card.description || ""}
                onNameChange={(e) => onCardNameChange(card.id, e)}
                onDescriptionChange={(e) => onCardDescriptionChange(card.id, e)}
                onDelete={() => {
                  setCardCount((prevCount) => prevCount - 1);
                  onDeleteCard(card.id);
                }}
              />
            ))}
          </div>
          {errorCards && (
            <div className="error-message-cards"><p>{t("error empty card name")}</p></div>
          )}
          {errorDuplicates && (
            <div className="error-message-cards">
              <p>{t("error duplicate name")}</p>
            </div>
          )}
        </div>
        <div className="add-buttons-container">
          <div className="multi-add-container">
            <p>{t("add")}</p>
            <input defaultValue="1" ref={addCardsRef}></input>
            <p>{t("cards")}</p>
            <button className="btn-secondary" type="button" onClick={() => {
                if (addCardsRef.current && parseInt(addCardsRef.current.value, 10) >= 1) {
                  setCardCount((prevCount) => prevCount + parseInt(addCardsRef.current!.value, 10));
                  onCreateXCards();
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="32" height="32">
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div className="bottom-container">
        <div className="btn-container">
          <button className="prev"  onClick={onPrev}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="next" onClick={onNext}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="page-no-container">
          <p>2</p>
          <p>{t("of")}</p>
          <p>{totalSteps}</p>
        </div>
      </div>
    </div>
  );
};