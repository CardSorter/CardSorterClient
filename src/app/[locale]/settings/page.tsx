"use client"
import React, {ChangeEvent, useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as settingsActions from "actions/settingsAction";
import {useRouter} from "i18n/navigation";
import {useTranslations} from "next-intl";
import "./settings.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ApplicationAlerts from "../../../elements/ApplicationAlerts/ApplicationAlerts";
import {ApplicationAlertContext} from "../../../reducers/applicationAlertsReducer";


const SettingsPage: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("SettingsPage");

  // State
  const currentUsername = useSelector((state: StateSchema) => (state.settings.username || ""));

  const currentEmail = useSelector((state: StateSchema) => (state.settings.email || ""));
  const token = useSelector((state: StateSchema) => state.auth.token);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");


  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (token) {
      dispatch(settingsActions.fetchUserProfile());
    }
  }, [dispatch, token]);


  const onBack = () => {
    dispatch(settingsActions.clearCredentials());
    router.push('/dashboard');
  }
  const onSaveSettings = () => {
    dispatch(
      settingsActions.saveSettings({
        newUsername: newUsername,
        newPassword: newPassword,
        newEmail: newEmail
      })
    )
  };

  return (
    <div className="settings-page">

      <div>
        <h1>{t("title")}</h1>
        <Button variant="text" startIcon={<span className="material-symbols-outlined">arrow_back</span>} onClick={onBack}>Back</Button>
      </div>

      <ApplicationAlerts context={ApplicationAlertContext.settingsPage} />

      <p>{t("fill in")}</p>

      <p>Username</p>
      <TextField label={t("current username")} variant="filled" value={currentUsername} disabled />
      <TextField label={t("new username")} variant="outlined" value={newUsername} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)} />

      <p>Password</p>
      <TextField label={t("new password")} type="password" variant="outlined" value={newPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />

      <p>Email</p>
      <TextField label={t("current email")} type="email" variant="filled" value={currentEmail} disabled />
      <TextField label={t("new email")} variant="outlined" value={newEmail} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)} />

      <Button variant="contained" onClick={onSaveSettings}>{t("save")}</Button>
    </div>
  );
};

export default SettingsPage;



