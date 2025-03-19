import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import StateSchema from "reducers/StateSchema";
import * as uiActions from "actions/sorting/uiAction";
import {useTranslations} from "next-intl";

const CommentPopup = () => {
  const t = useTranslations("SortingPage");

  const [preliminaryComment, setPreliminaryComment] = useState('');

  // State
  const userComment = useSelector((state: StateSchema) => state.sortingUi.userComment);

  // Dispatch
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(uiActions.setUserComment({content: preliminaryComment}));
    dispatch(uiActions.toggleCommentPopup(false));
  }

  useEffect(() => {
    setPreliminaryComment(userComment);
  }, [userComment]);

  return (
    <div className="popup-container">
      <div className="popup">
        <h1>{t("add comment")}</h1>
        <form>
          <textarea value={preliminaryComment} onChange={(e) => setPreliminaryComment(e.target.value)}>
          </textarea>
          <div className="btn-container">
            <button type="button" className="btn--secondary cancel" onClick={() => dispatch(uiActions.toggleCommentPopup(false))}>
              {t("cancel")}
            </button>
            <button type="button" className="btn--main submit" onClick={onSubmit}>
              {t("confirm")}
            </button>
          </div>
        </form>
      </div>
    </div>);
};

export default CommentPopup;
