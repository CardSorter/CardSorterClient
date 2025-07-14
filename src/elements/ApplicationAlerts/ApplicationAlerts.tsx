import {useSelector} from "react-redux";
import StateSchema from "../../reducers/StateSchema";
import Alert from '@mui/material/Alert';
import {ApplicationAlertContext} from "../../reducers/applicationAlertsReducer";

interface ApplicationAlertsProps {
  context: ApplicationAlertContext,
}

export default function ApplicationAlerts({context}: ApplicationAlertsProps) {
  const alerts = useSelector((state: StateSchema) => state.applicationAlerts.alerts);

  return (
    <div>
      {
        alerts.map((alert, i) => {
          if (alert.context === context) {
            return <Alert severity={alert.severity} key={`application-alert-${i}`}>{alert.message}</Alert>;
          }
        })
      }
    </div>
  )
}