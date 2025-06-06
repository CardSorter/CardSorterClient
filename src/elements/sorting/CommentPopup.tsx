import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import StateSchema from "reducers/StateSchema";
import * as uiActions from "actions/sorting/uiAction";
import {useTranslations} from "next-intl";

const CommentPopup = () => {
  const t = useTranslations("SortingPage");

  const [preliminaryComment, setPreliminaryComment] = useState('');
  const [ showCancelConfirm, setShowCancelConfirm] = useState(false);
  // State
  const userComment = useSelector((state: StateSchema) => state.sortingUi.userComment);

  // Dispatch
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(uiActions.setUserComment({content: preliminaryComment}));
    dispatch(uiActions.toggleCommentPopup(false));
    dispatch(uiActions.showCommentSaved());
    dispatch(uiActions.setCommentSaved(true));
  }
  const onCancel = () => {
    if (preliminaryComment.trim() !== userComment.trim()) {
      setShowCancelConfirm(true);
      return;
    }
    dispatch(uiActions.toggleCommentPopup(false));
  }
  useEffect(() => {
    setPreliminaryComment(userComment);
  }, [userComment]);

  return (
    <div>
    <div className="popup-container">
      <div className="popup">
        <h1>{t("add comment")}</h1>
        <form>
          <textarea placeholder={t("write your comment here")} value={preliminaryComment} onChange={(e) => setPreliminaryComment(e.target.value)}>
          </textarea>
          <div className="btn-container">
            <button type="button" className="btn--secondary cancel" onClick={onCancel}>
               <span>{t("cancel")}</span>
            
              
            </button>
            <button type="button" className="btn--main submit" onClick={onSubmit}>
              {t("confirm")}
            </button>
          </div>
        </form>
      </div>
    </div>
    {showCancelConfirm && (
      <div className="popup-container">
        <div className="popup">
          <h1>{t("confirm cancellation")}</h1>
          <p>{t("are you sure you want to discard changes")}</p>
          <div className="btn-container">
            <button
              type="button"
              className="btn--secondary "
              onClick={() => setShowCancelConfirm(false)}
            >
              <span>{t("no")}</span>
            </button>
            <button
              type="button"
              className="btn--main"
              onClick={() => {
                setShowCancelConfirm(false);
                dispatch(uiActions.toggleCommentPopup(false));
              }}
            >
              {t("yes")}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};



export default CommentPopup;
