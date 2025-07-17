import {createAction} from "@reduxjs/toolkit";
import {setAuthUsername} from "./authAction";
import {displayTemporaryAlert} from "./applicationAlertsAction";
import {ApplicationAlertContext} from "../reducers/applicationAlertsReducer";

export const changeUsername = createAction<{ username: string }>("settings/changeUsername");
export const changeNewUsername = createAction<{ username: string }>("settings/changeNewUsername");

export const changePassword = createAction<{ password: string }>("settings/changePassword");
export const changeNewPassword = createAction<{ password: string }>("settings/changeNewPassword");

export const changeEmail = createAction<{ email: string }>("settings/changeEmail");
export const changeNewEmail = createAction<{ email: string }>("settings/changeNewEmail");
export const clearCredentials = createAction("settings/clearCredentials");

export const saveSettings = (updatedProperties: {
    newUsername?: string;
    newPassword?: string;
    newEmail?: string;
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
              

              dispatch(displayTemporaryAlert("Profile updated", ApplicationAlertContext.settingsPage, "success"));
              return Promise.resolve();
              
              
            } else {
              response.json().then((data) => {
                dispatch(displayTemporaryAlert("Profile update failed", ApplicationAlertContext.settingsPage, "error"));
                return Promise.reject();
              });
            }
          })
          .catch((error) => {
            dispatch(displayTemporaryAlert("Profile update failed", ApplicationAlertContext.settingsPage, "error"));
          });
      };
    };
export const setUserProfile = createAction<{
    username: string;
    email: string;
}>("settings/setUserProfile");

export const fetchUserProfile = () => {
    return async (dispatch: Function, getState: Function) => {
        try {
            const token = getState().auth.token;
            if (!token) {
                // console.warn("No auth token found — skipping fetch.");
                return;
            }

            if (process.env.NODE_ENV !== 'production') {
              dispatch(changeUsername({ username: "developer" }));
              dispatch(changeEmail({ email: "developer@thankyou.com" }));
              return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_endpoint`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error("Failed to fetch user profile:", response.statusText);
                return;
            }

            const data = await response.json();

            // Dispatch actions with the fetched data
            dispatch(changeUsername({ username: data.username }));
            dispatch(changeEmail({ email: data.email }));

            // Alternatively, if you want to dispatch everything at once:
            // dispatch(setUserProfile({ username: data.username, email: data.email }));

        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };
};

