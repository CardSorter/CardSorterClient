"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import List from "elements/sorting/List";
import * as uiActions from "actions/sorting/uiAction";
import * as sortingBoardAction from "actions/sorting/sortingBoardAction";
import StateSchema from "reducers/StateSchema";
import ConfirmPopUp from "elements/sorting/ConfirmPopUp";
import ErrorToast from "elements/sorting/ErrorToast";
import DescriptionPopup from "elements/sorting/DescriptionPopup";
import GamifiedInstructionsPopup from "elements/sorting/GamifiedInstructionsPopup";
import CommentPopup from "elements/sorting/CommentPopup";
import { useTranslations } from "next-intl";
import LoadSortData from "elements/sorting/LoadSortData";
import { useParams } from "next/navigation";
import ShowAllCards from "elements/sorting/ShowAllCards";
import OnBoardingPartTwo from "elements/sorting/OnBoardingPartTwo";
import { PointerSensor as DndKitPointerSensor } from "@dnd-kit/core";
import { playSound } from "utils/audio/sounds";
import GamifiedBoard from "elements/sorting/GamifiedBoard";
import GamifiedList from "elements/sorting/GamifiedList";
import OnBoardingPartOne from "elements/sorting/OnBoardingPartOne";

class DragHandleSensor extends DndKitPointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent }: React.PointerEvent): boolean => {
        return !!(nativeEvent.target as HTMLElement).closest(".drag-handle");
      },
    },
  ];
}
export default function page() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("SortingPage");

  // State
  const showOnboarding = useSelector(
    (state: StateSchema) => state.sortingUi.showOnBoarding,
    // (state: StateSchema) => true,
  );
  const showOnboardingPartOne = useSelector(
    (state: StateSchema) => state.sortingUi.showOnBoardingPartOne,
  );
  const showOnboardingPartTwo = useSelector(
    (state: StateSchema) => state.sortingUi.showOnBoardingPartTwo,
    // (state: StateSchema) => true,
  );
  const showAllCards = useSelector(
    (state: StateSchema) => state.sortingUi.showAllCards,
  );
  const errorNoCategories = useSelector(
    (state: StateSchema) => state.sortingUi.errors.noCategoriesCreated,
  );
  const errorNoTitle = useSelector(
    (state: StateSchema) => state.sortingUi.errors.categoryMissingTitle,
  );
  const errorSameCategories = useSelector(
    (state: StateSchema) => state.sortingUi.errors?.categoriesHaveTheSameName,
  );
  const sameCategoryNames = useSelector(
    (state: StateSchema) => state.sortingUi.errors?.sameCategoryList,
  );
  const commentSaved = useSelector(
    (state: StateSchema) => state.sortingUi.commentSaved,
  );
  const categories = useSelector(
    (state: StateSchema) => state.sortingBoard.categories,
  );

  const categoryOrder = useSelector(
    (state: StateSchema) => state.sortingBoard.categoryOrder,
  );

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const activeCategory = activeCategoryId ? categories[activeCategoryId] : null;

  const sensors = useSensors(useSensor(DragHandleSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCategoryId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCategoryId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categoryOrder.indexOf(active.id as number);
    const newIndex = categoryOrder.indexOf(over.id as number);
    const newOrder = arrayMove(categoryOrder, oldIndex, newIndex);
    playSound("hand");
    dispatch(sortingBoardAction.reorderCategories({ orderedIDs: newOrder }));
  };

  const handleDragCancel = () => {
    setActiveCategoryId(null);
  };
  // Dispatch
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (commentSaved) {
      const timer = setTimeout(() => {
        dispatch(uiActions.setCommentSaved(false));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [commentSaved]);

  return (
    <>
      <LoadSortData id={id} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <DndProvider backend={HTML5Backend}>
          <div id="main-panel">
            {(!showOnboarding || showOnboardingPartTwo) && !showAllCards && (
              <GamifiedBoard activeCategory={activeCategory} />
            )}
            {(!showOnboarding || showOnboardingPartTwo) && !showAllCards && (
              <GamifiedList />
            )}
          </div>
        </DndProvider>
      </DndContext>
      <CommentPopup />
      <DescriptionPopup />
      <GamifiedInstructionsPopup />
      <ConfirmPopUp />

      {showOnboardingPartOne && showOnboarding && <OnBoardingPartOne />}
      {showOnboardingPartTwo && showOnboarding && <OnBoardingPartTwo />}

      {showAllCards && <ShowAllCards />}

      {errorNoCategories && (
        <ErrorToast message={t("error no categories created")} />
      )}

      {errorNoTitle && <ErrorToast message={t("error empty title")} />}

      {errorSameCategories && (
        <ErrorToast
          message={
            t("error duplicate titles") + (sameCategoryNames || []).join(", ")
          }
        />
      )}

      {commentSaved && <ErrorToast message={t("comment saved")} />}
    </>
  );
}
