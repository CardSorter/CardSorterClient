import React from "react";
import StateSchema from "../../../reducers/StateSchema";
import { useDispatch, useSelector } from "react-redux";
import * as uiAction from "actions/sorting/uiAction";
import { useTranslations } from "next-intl";
import Button from "@mui/material/Button";
import styles from "./GamifiedSortingHeader.module.scss";
import ProgressCount from "../ProgressBar/ProgressCount";

const GamifiedSortingHeader = () => {
  const t = useTranslations("SortingHeader");

  // State
  const categories = useSelector(
    (state: StateSchema) => state.sortingBoard.categories,
  );

  // Dispatch
  const dispatch = useDispatch();

  const onFinishClick = () => {
    // TODO: Refactor logic here. The title checks should be run whenever the user edits a title, not at the end of the sorting session.
    let hasCategoryWithoutTitle = false;
    let noCategoryCreated = false;
    let hasSameCategory = false;

    const sameCategory: string[] = [];
    const seenTitles: Record<string, boolean> = {};

    if (Object.keys(categories).length === 0) {
      noCategoryCreated = true;
    }

    for (const key in categories) {
      if (categories.hasOwnProperty(key)) {
        if (!categories[key].title) {
          hasCategoryWithoutTitle = true;
        } else {
          const title = categories[key].title.toLowerCase();

          if (seenTitles[title]) {
            hasSameCategory = true;
            if (!sameCategory.includes(title)) {
              sameCategory.push(title);
            }
          } else {
            seenTitles[title] = true;
          }
        }
      }
    }

    if (hasCategoryWithoutTitle) {
      dispatch(uiAction.showCategoryWithoutTitleError());
      return;
    }

    if (hasSameCategory) {
      dispatch(
        uiAction.showCategoriesWithSameNameError({
          categoriesList: sameCategory,
        }),
      );
      return;
    }

    if (noCategoryCreated) {
      dispatch(uiAction.showNoCategoryCreatedError());
      return;
    }

    dispatch(uiAction.showConfirmPopUp());
  };

  const onCommentClick = () => dispatch(uiAction.toggleCommentPopup(true));

  const onDescriptionClick = () =>
    dispatch(uiAction.toggleDescriptionPopup(true));

  const onInstructionsClick = () =>
    dispatch(uiAction.toggleInstructionsPopup(true));

  const onShowAllClick = () => dispatch(uiAction.showAllCards(true));

  const onBoardingFinalStep = useSelector(
    (state: StateSchema) => state.sortingUi.onBoardingFinalStep,
  );

  const onBoarding = useSelector(
    (state: StateSchema) => state.sortingUi.showOnBoarding,
  );

  return (
    <header
      className={styles.sortingHeader}
      style={onBoarding ? { pointerEvents: "none" } : {}}
    >
      <h1 className={styles.logo}>Card Sorter</h1>
      <div className={styles.btnContainer}>
        <ProgressCount />
        <Button variant="text" onClick={onShowAllClick}>
          {t("show all")}
        </Button>
        <Button variant="text" onClick={onInstructionsClick}>
          {t("instructions")}
        </Button>
        <Button variant="text" onClick={onDescriptionClick}>
          {t("show description")}
        </Button>

        {/* <button className="undo"></button> */}
        {/*<button className="help"></button>*/}
        {/* </div>
      <div className={styles.btnContainer}> */}

        <Button variant="outlined" onClick={onCommentClick}>
          {t("add comment")}
        </Button>
        <Button
          variant="contained"
          onClick={onFinishClick}
          style={
            onBoardingFinalStep
              ? {
                  zIndex: 1000,
                  boxShadow:
                    "10px 8px 0 white, -10px 8px 0 white, 10px -8px 0 white, -10px -8px 0 white",
                }
              : {}
          }
        >
          {t("finish")}
        </Button>
      </div>
    </header>
  );
};

export default GamifiedSortingHeader;
