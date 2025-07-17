import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import StateSchema from "reducers/StateSchema";
import * as uiActions from "actions/sorting/uiAction";
import {useTranslations} from "next-intl";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from "@mui/material/DialogContentText";

const CommentPopup = () => {
  const t = useTranslations("SortingPage");

  const [preliminaryComment, setPreliminaryComment] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // State
  const userComment = useSelector((state: StateSchema) => state.sortingUi.userComment);
  const showCommentPopup = useSelector((state: StateSchema) => state.sortingUi.showCommentPopup);

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

  const onDiscardChanges = () => {
    setPreliminaryComment('');
    setShowCancelConfirm(false);
    dispatch(uiActions.toggleCommentPopup(false));
  }

  useEffect(() => {
    setPreliminaryComment(userComment);
  }, [userComment]);

  return (
    <>
      {/* Main Comment Dialog */}
      <Dialog open={showCommentPopup} onClose={onCancel} fullWidth maxWidth="sm">
        <DialogTitle>{t("add comment")}</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            placeholder={t("write your comment here")}
            value={preliminaryComment}
            onChange={(e) => setPreliminaryComment(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            {t("cancel")}
          </Button>
          <Button onClick={onSubmit} variant="contained">
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        maxWidth="xs"
      >
        <DialogTitle>{t("confirm cancellation")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("are you sure you want to discard changes")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelConfirm(false)} variant="outlined">
            {t("no")}
          </Button>
          <Button onClick={onDiscardChanges} color="primary" variant="contained">
            {t("yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};



export default CommentPopup;
