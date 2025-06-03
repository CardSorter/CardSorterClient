import React from 'react';
import {toggleDescriptionPopup} from 'actions/sorting/uiAction';
import {useDispatch, useSelector} from 'react-redux';
import StateSchema from "reducers/StateSchema";

export default function DescriptionPopup() {

  // Sate
  const title = useSelector((state: StateSchema) => state.sortingUi.studyTitle);
  const description = useSelector((state: StateSchema) => state.sortingUi.studyDescription);

  // Dispatch
  const dispatch = useDispatch();

  const onClose = () => dispatch(toggleDescriptionPopup(false));

  return (
    <div className="popup-container">
      <div className="popup" >
        <h1>{title}</h1>
        <h3>{description}</h3>
        <div className="btn-container">
          <button type="button" className="btn--main submit" onClick={onClose}>Close</button>
        </div>
      </div>
    </div >
  );
}