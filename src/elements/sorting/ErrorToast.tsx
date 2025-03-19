import React, { useEffect } from 'react';
import {useDispatch} from "react-redux";
import * as uiAction from "../../actions/sorting/uiAction";

interface ErrorToastProps {
  message: string | undefined;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message }) => {

  // Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    let toastTimer: number | undefined;
    
    toastTimer = window.setTimeout(() => dispatch(uiAction.hideErrors()), 6000);

    return () => {
      window.clearTimeout(toastTimer);
    };
  }, []);

  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default ErrorToast;