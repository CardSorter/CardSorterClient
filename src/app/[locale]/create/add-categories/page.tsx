"use client";

import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useRouter} from "i18n/navigation";

import StateSchema from "reducers/StateSchema";
import {useDispatch, useSelector} from "react-redux";
import * as studyCreationAction from "actions/studyCreationAction";
import type {Category} from "reducers/studyCreationReducer";
import {useTranslations} from "next-intl";

interface CategoryProps {
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const CategoryInput: React.FC<CategoryProps> = ({name, onNameChange, onDelete}) => {
  const t = useTranslations("CreateStudyPage");

  return (
    <div className="category-row" >
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
  
  const router = useRouter();

  // State
  const title = useSelector((state: StateSchema) => state.studyCreation.title);
  const categories = useSelector((state: StateSchema) => state.studyCreation.categories || {});
  const errorCategories = useSelector((state: StateSchema) => state.studyCreation.errorCategories);
  const sortType = useSelector((state: StateSchema) => state.studyCreation.sortType);
  const totalSteps = (sortType === "open") ? 3 : 4;
  const categoryCount = Object.keys(categories).length;

  // Dispatch
  const dispatch = useDispatch();

  const onCreateXCategories = () => {
    if (addRef.current) {
        const count = parseInt(addRef.current.value || "0", 10);
        if (count >= 1) {
          dispatch(studyCreationAction.addXCategories({ no: count }));
        }
      }
  };

  const onCategoryNameChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    dispatch(studyCreationAction.toggleCategoryError({status: false}));
    const name = event.target.value;
    dispatch(studyCreationAction.changeCategoryName({id, name}));
  };

  const onDeleteCategory = (id: number) => {
    dispatch(studyCreationAction.deleteCategory({id}));
  };

  const onNext = () => {
    let hasEmpty = false;
  const seen = new Set<string>();
  let hasDuplicate = false;

  Object.values(categories).forEach((cat) => {
    const name = cat.name?.trim();
    const normalized = name?.toLowerCase();

    if (!name) {
      hasEmpty = true;
    } else if (seen.has(normalized)) {
      hasDuplicate = true;
    } else {
      seen.add(normalized);
    }
  });

  if (hasEmpty) {
    dispatch(studyCreationAction.toggleCategoryError({ status: true, type: "empty" }));
    setTimeout(() => dispatch(studyCreationAction.toggleCategoryError({ status: false, type: null })), 5000);
    return;
  }

  if (hasDuplicate) {
    dispatch(studyCreationAction.toggleCategoryError({ status: true, type: "duplicate" }));
    setTimeout(() => dispatch(studyCreationAction.toggleCategoryError({ status: false, type: null })), 5000);
    return;
  }

  router.push("/create/final");
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
    <div className="study-creation-card">
      <h1>{t("title")}</h1>
      <h2>{t("total categories")} {categoryCount}</h2>

      <form className="cards">
        <div className="error-holder">
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
          {errorCategories?.status && (
           <div className="error-message-cards">
            {errorCategories.type === "empty" && <p>{t("error empty category name")}</p>}
            {errorCategories.type === "duplicate" && <p>{t("error duplicate category names")}</p>}
           </div>
          )}

        </div>

        <div className="add-buttons-container">
          <div className="multi-add-container">
            <p>{t("add")}</p>
            <input defaultValue="1" ref={addRef}></input>
            <p>{t("categories")}</p>
            <button
              className="btn-secondary"
              type="button"
              onClick={onCreateXCategories}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="32" height="32">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div className="bottom-container">
        <div className="btn-container">
          <button className="prev" onClick={onPrev}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="next" onClick={onNext}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
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
