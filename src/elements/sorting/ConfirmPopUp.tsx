import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendSort, closeConfirmPopUp, CategoryRequest} from 'actions/sorting/uiAction';
import StateSchema from "reducers/StateSchema";
import {useTranslations} from "next-intl";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmPopUp = () => {
  const t = useTranslations("SortingPage");

  // State
  const studyId = useSelector((state: StateSchema) => (state.sortingUi.studyID));
  const unsortedCards = useSelector((state: StateSchema) => (state.sortingBoard.unsortedCards));
  const categories = useSelector((state: StateSchema) => (state.sortingBoard.categories));
  const timeStarted = useSelector((state: StateSchema) => state.sortingUi.timeStarted);
  const comment = useSelector((state: StateSchema) => state.sortingUi.userComment);
  const showConfirmPopUp = useSelector((state: StateSchema) => (state.sortingUi.showConfirmPopUp));

  // Dispatch
  const dispatch = useDispatch<any>();

  const handleConfirmFinish = () => {
    const categoryRequest: Record<number, CategoryRequest> = {};
    for (const category of Object.values(categories)) {
      categoryRequest[category.id] = {
        id: category.id,
        title: category.title || "",
        cards: category.cards.map((c) => c.id)
      };
    }


    dispatch(sendSort(
      studyId || "",
      unsortedCards.map((c) => (c.id)),
      categoryRequest,
      timeStarted || new Date(),
      new Date(),
      comment || "",
    ));
  };

  const onClose = () => dispatch(closeConfirmPopUp());

  return (
    <Dialog
      open={showConfirmPopUp}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      onClick={onClose}
    >
      <DialogContent>
        <DialogContentText>
          {unsortedCards.length > 0
            ? t("confirm finish unsorted")
            : t("confirm finish")}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onClose}>
          {t("continue sorting")}
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirmFinish}>
          {t("finish sorting")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPopUp;