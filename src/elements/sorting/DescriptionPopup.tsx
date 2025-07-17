import React from 'react';
import {toggleDescriptionPopup} from 'actions/sorting/uiAction';
import {useDispatch, useSelector} from 'react-redux';
import StateSchema from "reducers/StateSchema";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from '@mui/material/IconButton';

export default function DescriptionPopup() {

  // State
  const title = useSelector((state: StateSchema) => state.sortingUi.studyTitle);
  const description = useSelector((state: StateSchema) => state.sortingUi.studyDescription);
  const showDescriptionPopup = useSelector((state: StateSchema) => state.sortingUi.showDescriptionPopup);

  // Dispatch
  const dispatch = useDispatch();

  const onClose = () => dispatch(toggleDescriptionPopup(false));

  return (
    <Dialog
      open={showDescriptionPopup}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
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
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}