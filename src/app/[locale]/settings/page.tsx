"use client"
import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as settingsActions from "actions/settingsAction";
import {useRouter} from "i18n/navigation";
import {useTranslations} from "next-intl";
import ErrorToast from "elements/sorting/ErrorToast";


const SettingsPage: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("SettingsPage");

  // State
  const currentUsername = useSelector((state: StateSchema) => (state.settings.username || "" ));
  const currentPassword = useSelector((state: StateSchema) => (state.settings.password || "" ));
  const currentEmail = useSelector((state: StateSchema) => (state.settings.email || ""));

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const settingsSaved = useSelector((state: StateSchema) => state.settings.settingsSaved);

 
  

  const dispatch = useDispatch<any>();

  useEffect(() => {
    const fetchUserProfile = async() => {
        try{
            const token = localStorage.getItem("authToken");
            console.log("Token fetched from localStorage:", token);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_endpoint`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok){
                const data=await response.json();
                dispatch(settingsActions.changeUsername({ username: data.username }));
                dispatch(settingsActions.changeEmail({ email: data.email }));
                
                
            }else{
                console.error("Failed to fetch user profile:", response.statusText);

            }
        } catch(error){
            console.error("Error fetching user profile:",error );

        }
    };
    fetchUserProfile();
  },[dispatch]);
  

  const onBack = () => {
      dispatch(settingsActions.clearCredentials());
      router.push('/dashboard');
    }
    const onSaveSettings = () => {
        dispatch(
          settingsActions.saveSettings({
            currentUsername: currentUsername || "",
            newUsername: newUsername || "",
            currentPassword: currentPassword || "",
            newPassword: newPassword || "",
            currentEmail: currentEmail || "",
            newEmail: newEmail || ""
          })
        )
        
          
          
      };

      return (
        <div className="settings-page">
          <div className="settings-container">
           <div className="settings-icon">
             <img src="/card-sorter/images/profile-icon.png" alt="Profile Icon" />
            </div>
            <div className="auth-header">
              <div className="back-button">
               <button className="back" onClick={onBack}>
                <span className="material-symbols-outlined">arrow_back</span>
               </button>
              </div>
              <div className="center-title">
               <p className="auth-title">{t("settings")}</p>
              </div>
              <div className="spacer" />
            </div>
            <p className="info-text">
               {t("update")} 
            </p>
            <form>
              <div className="error-holder">
                <input
                  type="text"
                  className="username"
                  value={currentUsername}
                  placeholder={t("current username")}
                  disabled
                />
              </div>
              <div className="error-holder">
                <input
                  type="text"
                  className="username"
                  value={newUsername}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
                  placeholder={t("new username")}
                />
              </div>
              <div className="error-holder">
                <input
                  type="password"
                  className="password"
                  value={"•".repeat(9)}
                  placeholder={t("current password")}
                  disabled
                />
              </div>
              <div className="error-holder">
                <input
                  type="password"
                  className="password"
                  value={newPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                  placeholder={t("new password")}
                />
              </div>
              <div className="error-holder">
                <input
                  type="email"
                  className="email"
                  value={currentEmail}
                  placeholder={t("current email")}
                  disabled
                />
              </div>
              <div className="error-holder">
                <input
                  type="email"
                  className="email"
                  value={newEmail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)}
                  placeholder={t("new email")}
                />
              </div>
              <button
                type="button"
                className="action save"
                onClick={onSaveSettings}
              >
                <p>{t("save")}</p>
              </button>
            </form>
            {settingsSaved && (
            <div className="settings-toast">
             <ErrorToast  message={t("Your changes have been saved")} />
            </div>
            )}
         </div>
         
        </div>
      );
    };
    
    export default SettingsPage;



