import {createReducer} from "@reduxjs/toolkit";
import * as applicationAlertsActions from "actions/applicationAlertsAction";

export enum ApplicationAlertContext {
  application,
  studyPage,
  settingsPage,
}
export interface ApplicationAlert {
  id: string | undefined;
  severity: "success" | "info" | "warning" | "error";
  message: string;
  context: ApplicationAlertContext;
}

export interface ApplicationAlertsState {
  alerts: ApplicationAlert[]
}

const initialState: ApplicationAlertsState = {
  alerts: []
}

const applicationAlertsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(applicationAlertsActions.addAlert, (state, action) => {
        state.alerts.push({
          message: action.payload.message,
          severity:  action.payload.severity,
          context: action.payload.context,
          id: action.payload.id,
        });
      })
      .addCase(applicationAlertsActions.removeAlert,  (state, action) => {
        state.alerts = state.alerts.filter((alert) => alert.id !== action.payload.id);
      })
})

export default applicationAlertsReducer;