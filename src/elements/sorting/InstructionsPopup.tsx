import React from 'react';
import { useDispatch } from 'react-redux';
import * as uiActions from 'actions/sorting/uiAction';
import { useTranslations } from 'next-intl';

const InstructionsPopup = () => {
  const t = useTranslations("SortingPage");
  const dispatch = useDispatch();

  return (
    <div className="popup-container">
      <div className="popup">
        <h1>{t("instructions")}</h1>
        <div className="instructions-content">
          <h3>{t("instructions step1")}</h3>
          <p>{t("step1")}</p>
          <h3>{t("instructions step2")}</h3>
          <p>{t("step2")}</p>
          <h3>{t("instructions step3")}</h3>
          <p>{t("step3")}</p>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn--main submit"
            onClick={() => dispatch(uiActions.toggleInstructionsPopup(false))}
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPopup;


