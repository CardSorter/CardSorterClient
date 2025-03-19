"use client"

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SplitPane from 'react-split-pane';

import List from 'elements/sorting/List';
import StateSchema from "reducers/StateSchema";
import ConfirmPopUp from "elements/sorting/ConfirmPopUp";
import ErrorToast from "elements/sorting/ErrorToast";
import Board from "elements/sorting/Board";
import OnBoarding from "elements/sorting/OnBoarding";
import DescriptionPopup from "elements/sorting/DescriptionPopup";
import CommentPopup from "elements/sorting/CommentPopup";
import {useTranslations} from "next-intl";
import LoadSortData from "elements/sorting/LoadSortData";
import {useParams} from "next/navigation";

export default function page() {
  const {id} = useParams<{ id: string }>();
  const t = useTranslations("SortingPage");

  // State
  const showCommentPopup = useSelector((state: StateSchema) => state.sortingUi.showCommentPopup);
  const showDescriptionPopup = useSelector((state: StateSchema) => state.sortingUi.showDescriptionPopup);
  const showConfirmPopUp = useSelector((state: StateSchema) => (state.sortingUi.showConfirmPopUp));
  const showOnboarding = useSelector((state: StateSchema) => state.sortingUi.showOnBoarding);

  const errorNoCategories = useSelector((state: StateSchema) => state.sortingUi.errors.noCategoriesCreated);
  const errorNoTitle = useSelector((state: StateSchema) => (state.sortingUi.errors.categoryMissingTitle));
  const errorSameCategories = useSelector((state: StateSchema) => (state.sortingUi.errors?.categoriesHaveTheSameName));
  const sameCategoryNames = useSelector((state: StateSchema) => (state.sortingUi.errors?.sameCategoryList));

  // Dispatch
  const dispatch = useDispatch<any>();

  return (
    <>
      <LoadSortData id={id} />
      <DndProvider backend={HTML5Backend}>
        <div id="main-panel">
          {/*@ts-ignore*/}
          <SplitPane
            className="split-pane"
            split="vertical"
            minSize={200}
            maxSize={-300}
            defaultSize={'22rem'}
          >
            <List/>
            <Board/>
          </SplitPane>
        </div>
      </DndProvider>

      {
        showCommentPopup &&
          <CommentPopup />
      }

      {
        showOnboarding &&
         <OnBoarding />
      }

      {
        showDescriptionPopup &&
          <DescriptionPopup />
      }

      {
        showConfirmPopUp &&
          <ConfirmPopUp />
      }

      {
        errorNoCategories &&
          <ErrorToast message={t("error no categories created")} />
      }

      {
        errorNoTitle &&
          <ErrorToast message={t("error empty title")} />
      }

      {errorSameCategories &&
        <ErrorToast message={t("error duplicate titles") + (sameCategoryNames || []).join(', ')} />
      }
    </>
  );
};

