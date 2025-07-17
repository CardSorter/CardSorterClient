import React from 'react';
import copyToClipboard from "utils/copyToClipboard";
import styles from "./Popup.module.scss";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputWithCopy from "../InputWithCopy/InputWithCopy";

interface PopupProps {
  title?: string;
  url?: string;
  onClose: () => void;
  open: boolean,
}

const Popup: React.FC<PopupProps> = ({title, url, onClose, open}) => {

  function onCopy() {
    copyToClipboard(url || "");
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {title}
      </DialogTitle>

      <DialogContent>
        {
          url &&
            <InputWithCopy inputText={url}/>
        }
      </DialogContent>
    </Dialog>
  )
};

export default Popup;


