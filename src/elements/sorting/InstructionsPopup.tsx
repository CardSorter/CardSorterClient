import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as uiActions from 'actions/sorting/uiAction';
import {useTranslations} from 'next-intl';
import StateSchema from "../../reducers/StateSchema";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from '@mui/material/IconButton';

const InstructionsPopup = () => {
  const t = useTranslations("SortingPage");

  // State
  const showInstructionsPopup = useSelector((state: StateSchema) => state.sortingUi.showInstructionsPopup);

  // Dispatch
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(uiActions.toggleInstructionsPopup(false));
  }

  return (
    <Dialog
      open={showInstructionsPopup}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{pb: 2}}>
        {t("instructions")}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <span className="material-symbols-outlined">close</span>
      </IconButton>

      <DialogContent dividers sx={{pt: 3, pb: 4}}>
        <h4>{t("instructions step1")}</h4>
        <p>{t("step1")}</p>

        <h4>{t("instructions step2")}</h4>
        <p>{t("step2")}</p>

        <h4>{t("instructions step3")}</h4>
        <p>{t("step3")}</p>

      </DialogContent>
    </Dialog>
  );
};

export default InstructionsPopup;


