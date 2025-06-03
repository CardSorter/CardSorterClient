import {createAction} from "@reduxjs/toolkit";
import * as ActionStatus from "actions/ActionStatus";
import {setAuthToken} from "./authAction";
import { setAuthUsername } from "./authAction";

export const changeUsername = createAction<{ username: string }>("settings/changeUsername");
export const changeNewUsername = createAction<{ username: string }>("settings/changeNewUsername");

export const changePassword = createAction<{ password: string }>("settings/changePassword");
export const changeNewPassword = createAction<{ password: string }>("settings/changeNewPassword");

export const changeEmail = createAction<{ email: string }>("settings/changeEmail");
export const changeNewEmail = createAction<{ email: string }>("settings/changeNewEmail");
export const clearCredentials = createAction("settings/clearCredentials");
export const setSettingsSaved = createAction<boolean>("settings/setSettingsSaved");

export const saveSettings = (updatedProperties: {
    currentUsername: string;
    newUsername: string;
    currentPassword: string;
    newPassword: string;
    currentEmail: string;
    newEmail: string;
}) => {
    return (dispatch: Function, getState: Function) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_endpoint`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.token}`,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify(updatedProperties),
        })
          .then((response) => {
            if (response.ok) {
              
              if (updatedProperties.newUsername) {
                dispatch(changeUsername({ username: updatedProperties.newUsername }));
                dispatch(setAuthUsername(updatedProperties.newUsername));
              }
              if (updatedProperties.newEmail) {
                dispatch(changeEmail({ email: updatedProperties.newEmail }));
              }
              console.log('Settings updated successfully');

              dispatch(setSettingsSaved(true));
              setTimeout(() => {
                dispatch(setSettingsSaved(false));
              }, 3000);
              return Promise.resolve();
              
              
            } else {
              response.json().then((data) => {
                console.error('Failed to update settings:', data.error || response.statusText);
                alert('Failed to update settings: ' + (data.error || response.statusText));
                return Promise.reject();
                
              });
            }
          })
          .catch((error) => {
            console.error('An error occurred while updating settings:', error);
            alert('An error occurred while updating settings: ' + error);
          });
      };
    };
export const setUserProfile = createAction<{
    username: string;
    email: string;
}>("settings/setUserProfile");

