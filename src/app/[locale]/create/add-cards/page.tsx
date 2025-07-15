"use client"

import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useRouter} from "i18n/navigation";

import StateSchema from "reducers/StateSchema";
import {useDispatch, useSelector} from "react-redux";
import * as studyCreationAction from "actions/studyCreationAction";
import type {Card} from "reducers/studyCreationReducer";
import {useTranslations} from "next-intl";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

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
  const router = useRouter();

  const addCardsRef = useRef<HTMLInputElement>(null);
  const [cardCount, setCardCount] = useState<number>(0);
  const [cardError, setCardError] = useState<boolean>(false);
  const [duplicateCardName, setDuplicateCardName] = useState<string | undefined>(undefined);

  // State
  const title = useSelector((state: StateSchema) => state.studyCreation.title);
  const cards = useSelector((state: StateSchema) => (state.studyCreation?.cards));
  const sortType = useSelector((state: StateSchema) => state.studyCreation.sortType);
  const totalSteps = (sortType === "open") ? 3 : 4;



  // Dispatch
  const dispatch = useDispatch();

  const onCreateXCards = () => {
    dispatch(studyCreationAction.addXCards({no: parseInt(addCardsRef?.current?.value || "")}));
  }

  const onCardNameChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    setCardError(false);
    setDuplicateCardName(undefined);

    const name = event.target.value;
    dispatch(studyCreationAction.changeCardName({id, name}));
  }

  const onCardDescriptionChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
      const description = event.target.value;
      dispatch(studyCreationAction.changeCardDescription({id, description}));
  }

  const onDeleteCard = (id: number) => {
    setCardError(false);
    setDuplicateCardName(undefined);
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
      setCardError(true);
      return;
    }

    const cardNames =  Object.values(cards).map((card) => card.name?.trim().toLowerCase());
    const seenCardNames = new Set();

    for (const cardName of cardNames) {
      if (seenCardNames.has(cardName)) {
        setDuplicateCardName(cardName);
        return;
      } else {
        seenCardNames.add(cardName);
      }
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
    <div className="study-creation-page">
      <h1>{t("title")}</h1>
      <h2>{t("total cards")}{cardCount} </h2>

      <form className="cards">
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

        <div className="error-holder">
          {cardError && (
            <Alert severity="error">{t("error empty card name")}</Alert>
          )}
          {duplicateCardName && (
            <Alert severity="error">{t("error duplicate name")} {duplicateCardName}</Alert>
          )}
        </div>

        <div className="add-buttons-container">
          <div className="multi-add-container">
            <p>{t("add")}</p>
            <input defaultValue="1" ref={addCardsRef}></input>
            <p>{t("cards")}</p>
            <Button variant="contained" onClick={() => {
                if (addCardsRef.current && parseInt(addCardsRef.current.value, 10) >= 1) {
                  setCardCount((prevCount) => prevCount + parseInt(addCardsRef.current!.value, 10));
                  onCreateXCards();
                }
              }}>
              <span className="material-symbols-outlined">add</span>
            </Button>
          </div>
        </div>
      </form>

      <div className="bottom-container">
        <div className="btn-container">
          <Button aria-label="Previous step" variant="outlined" onClick={onPrev}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Button>
          <Button aria-label="Next step" variant="contained" onClick={onNext}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
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