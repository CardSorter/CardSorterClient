"use client"

import React, {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "../../../../../reducers/StateSchema";
import * as studyAction from "../../../../../actions/studyPageAction";
import {useTranslations} from "next-intl";
import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import styles from "./edit.study.module.scss";
import {useParams} from "next/navigation";
import {useRouter} from "i18n/navigation";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Page() {
  const {id} = useParams<{ id: string }>();
  const t = useTranslations("StudyPage");
  const router = useRouter();

  const [editTitle, setEditTitle] = useState("");
  const [editIsLive, setEditIsLive] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // State
  const title = useSelector((state: StateSchema) => (state.study.title));
  const isLive = useSelector((state: StateSchema) => (state.study.isLive));
  const description = useSelector((state: StateSchema) => (state.study.description));

  // Dispatch
  const dispatch = useDispatch<any>();

  useEffect(() => {
    setEditTitle(title);
    setEditIsLive(isLive || false);
    setEditDescription(description || "");
  }, [title, isLive, description]);

  const goBack = () => {
    router.push(`/study/${id}`);
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditDescription(event.target.value);
  };

  const handleIsLiveChange = (event: MouseEvent<HTMLElement>, value: any) => {
    if (value !== null) {
      setEditIsLive(value);
    }
  };

  const handleEditSubmit = () => {
    if (!id) {
      return;
    }
    dispatch(studyAction.updateStudy(id, {title: editTitle, isLive: editIsLive, description: editDescription}));
  };

  const handleConfirmDelete = () => {
    if (!id) {
      return;
    }

    dispatch(studyAction.deleteStudy(id));

    router.push("/");
  };

  const onDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }

  return (
    <div className={styles.editStudyContainer}>
      <div>
        <h1>{t("edit study")}: {title}</h1>
        <Button variant="text" startIcon={<span className="material-symbols-outlined">arrow_back</span>}
                onClick={goBack}>Back</Button>
      </div>

      <div className={styles.form}>
        <TextField label="Study title" variant="outlined" value={editTitle} onChange={handleTitleChange}/>

        <TextField label="Description" variant="outlined" value={editDescription} onChange={handleDescriptionChange}
                   multiline/>

        <div>
          <p>Accepting Replies</p>
          <ToggleButtonGroup value={editIsLive} exclusive onChange={handleIsLiveChange} aria-label="Accepting replies">
            <ToggleButton value={true} aria-label="left aligned">
              Yes
            </ToggleButton>
            <ToggleButton value={false} aria-label="centered">
              No
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>


      <div className={styles.actions}>
        <Button variant="contained" onClick={handleEditSubmit}>Save changes</Button>
        <Button variant="outlined" onClick={() => setDeleteDialogOpen(true)} color="error">Delete study</Button>
      </div>

      <Dialog open={deleteDialogOpen} onClose={onDeleteDialogClose} aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {t("confirm delete")} {title}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("confirm delete explanation")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteDialogClose} variant="contained" autoFocus>{t("button don't delete")}</Button>
          <Button onClick={handleConfirmDelete} variant="outlined" color="error">{t("button delete")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}