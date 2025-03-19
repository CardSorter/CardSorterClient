import React from 'react';
import StateSchema from "../../reducers/StateSchema";
import {useDispatch, useSelector} from "react-redux";
import * as uiAction from "actions/sorting/uiAction";
import {useTranslations} from "next-intl";

const Header = () => {
  const t = useTranslations("SortingHeader");

  // State
  const categories = useSelector((state: StateSchema) => state.sortingBoard.categories);

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
      dispatch(uiAction.showCategoriesWithSameNameError({categoriesList: sameCategory}));
      return;
    }

    if (noCategoryCreated) {
      dispatch(uiAction.showNoCategoryCreatedError());
      return;
    }

    dispatch(uiAction.showConfirmPopUp());
  }

  const onCommentClick = () => dispatch(uiAction.toggleCommentPopup(true));

  const onDescriptionClick = () => dispatch(uiAction.toggleDescriptionPopup(true));


  return (
    <header className="sorting-header">
      <div className="left-buttons">
        {/*<button className="undo"></button>*/}
        {/*<button className="help"></button>*/}
      </div>
      <h1 id="logo">Card Sorter</h1>
      <button className="btn--third" onClick={onDescriptionClick}>
        <p>{t("show description")}</p>
      </button>
      <button className="btn--secondary" onClick={onCommentClick}>
        <p>{t("add comment")}</p>
      </button>
      <button className="btn--main" onClick={onFinishClick} >
        <p>{t("finish")}</p>
      </button>
    </header>
  );
}

export default Header;