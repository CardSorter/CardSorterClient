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
          <h3>Step 1</h3>
          <p>Take a quick look at the items to the left.</p>
          <h3>Step 2</h3>
          <p>Drag an item into one of the categories on the right.</p>
          <h3>Step 3</h3>
          <p>Click “Finish” when you're done.</p>
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


