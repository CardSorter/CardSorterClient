import {createAction} from "@reduxjs/toolkit";
import * as ActionStatus from "actions/ActionStatus";
import {setAuthToken} from "./authAction";

export const changeUsername = createAction<{ username: string }>("register/changeUsername");
export const changePassword = createAction<{ password: string }>("register/changePassword");
export const changeEmail = createAction<{ email: string }>("register/changeEmail");
export const clearCredentials = createAction("register/clearCredentials");
export const clearUsernameError = createAction("register/clearUsernameError");
export const clearPasswordError = createAction("register/clearPasswordError");
export const clearEmailError = createAction("register/clearEmailError");
export const sendingCredentials = createAction<{
  status: string;
  error?: string;
}>("register/sendingCredentials");

/* Thunk actions */

/**
 * Sends the credentials to the server.
 */
export function sendRegisterCredentials(username: string, password: string, email: string) {
  return function (dispatch: (action: any) => void) {
    dispatch(sendingCredentials({status: ActionStatus.IS_FETCHING}));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/user_endpoint?register=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    }).then((response) =>
      response.json().then((json) => {
        // Append the new token
        dispatch(setAuthToken(json.auth_token));
          // Errors are not handled correctly here. Possible also in Login
        dispatch(
          sendingCredentials({
            status: ActionStatus.SUCCESS,
            error: json.error?.message,
          })
        );
      })
    );
  };
}
