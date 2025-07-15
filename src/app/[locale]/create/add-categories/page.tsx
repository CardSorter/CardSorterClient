"use client";

import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useRouter} from "i18n/navigation";

import StateSchema from "reducers/StateSchema";
import {useDispatch, useSelector} from "react-redux";
import * as studyCreationAction from "actions/studyCreationAction";
import type {Category} from "reducers/studyCreationReducer";
import {useTranslations} from "next-intl";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

interface CategoryProps {
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const CategoryInput: React.FC<CategoryProps> = ({name, onNameChange, onDelete}) => {
  const t = useTranslations("CreateStudyPage");

  return (
    <div className="category-row">
      <input
        type="text"
        placeholder={t("category name")}
        defaultValue={name}
        onChange={(e) => onNameChange(e)}
      />
      <button type="button" onClick={onDelete}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};

export default function Page() {
  const t = useTranslations("CreateStudyPage");

  const addRef = useRef<HTMLInputElement>(null);
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [duplicateCategoryName, setDuplicateCategoryName] = useState<string | undefined>(undefined);

  const router = useRouter();

  // State
  const title = useSelector((state: StateSchema) => state.studyCreation.title);
  const categories = useSelector((state: StateSchema) => state.studyCreation.categories || {});
  const sortType = useSelector((state: StateSchema) => state.studyCreation.sortType);
  const totalSteps = (sortType === "open") ? 3 : 4;
  const categoryCount = Object.keys(categories).length;

  // Dispatch
  const dispatch = useDispatch();

  const onCreateXCategories = () => {
    if (addRef.current) {
      const count = parseInt(addRef.current.value || "0", 10);
      if (count >= 1) {
        dispatch(studyCreationAction.addXCategories({no: count}));
      }
    }
  };

  const onCategoryNameChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    setCategoryError(false);
    setDuplicateCategoryName(undefined);

    const name = event.target.value;
    dispatch(studyCreationAction.changeCategoryName({id, name}));
  };

  const onDeleteCategory = (id: number) => {
    setCategoryError(false);
    setDuplicateCategoryName(undefined);
    dispatch(studyCreationAction.deleteCategory({id}));
  };

  const onNext = () => {
    const seen = new Set<string>();
    let error = false;

    Object.values(categories).forEach((cat) => {
      const name = cat.name?.trim();
      const normalized = name?.toLowerCase();

      if (!name) {
        setCategoryError(true);
        error = true;
        return;
      } else if (seen.has(normalized)) {
        setDuplicateCategoryName(name);
        error = true;
        return;
      } else {
        seen.add(normalized);
      }
    });

    if (!error) {
      router.push("/create/final");
    }
  };


  const onPrev = () => {
    router.push("/create/add-cards");
  };

  useEffect(() => {
    if (!title) {
      router.push("/create");
    }
  }, [router, title]);

  return (
    <div className="study-creation-page">
      <h1>{t("title")}</h1>
      <h2>{t("total categories")} {categoryCount}</h2>

      <form className="cards">
        <div className="category-container">
          {Object.values(categories).map((cat) => (

            <CategoryInput
              key={"cat" + cat.id}
              name={cat.name || ""}
              onNameChange={(e) => onCategoryNameChange(cat.id, e)}
              onDelete={() => {
                onDeleteCategory(cat.id);
              }}
            />

          ))}
        </div>

        <div className="error-holder">
          {categoryError &&
            <Alert severity="error">{t("error empty category name")}</Alert>
          }

          {
            duplicateCategoryName &&
              <Alert severity="error">{t("error duplicate category names")} {duplicateCategoryName}</Alert>
          }
        </div>

        <div className="add-buttons-container">
          <div className="multi-add-container">
            <p>{t("add")}</p>
            <input defaultValue="1" ref={addRef}></input>
            <p>{t("categories")}</p>
            <Button variant="contained" onClick={onCreateXCategories}>
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
          <p>3</p>
          <p>{t("of")}</p>
          <p>{totalSteps}</p>
        </div>
      </div>
    </div>
  );
}
