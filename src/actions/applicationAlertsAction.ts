import {createAction} from "@reduxjs/toolkit";
import {ApplicationAlertContext} from "../reducers/applicationAlertsReducer";

export const addAlert = createAction<{message: string, severity: "success" | "info" | "warning" | "error", context: ApplicationAlertContext, id?: string}>("addAlert");
export const removeAlert = createAction<{id: string}>("removeAlert");

/* Thunk actions */

export function displayTemporaryAlert(message: string, context: ApplicationAlertContext, severity: "success" | "info" | "warning" | "error", ) {
  return function (dispatch: Function) {
    const id = Math.random().toString(16).slice(2);
    dispatch(addAlert({message, context, severity, id}));

    setTimeout(() => {
      dispatch(removeAlert({id}));
    }, 6000);
  };
}
