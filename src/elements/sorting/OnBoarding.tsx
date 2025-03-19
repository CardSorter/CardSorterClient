import React from 'react';
import {useDispatch} from "react-redux";
import * as uiAction from "actions/sorting/uiAction";


const OnBoarding = () => {

  // Dispatch
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(uiAction.toggleOnBoarding(false));
    dispatch(uiAction.startSort());
  }

  return (
    <div className="on-boarding-screen" onClick={(e) => onClick(e)}>
      <div className="list-explainer">
        <span>
          <h3>Step 1</h3>
          <p>Take a quick look at the list of items to the left.</p>
          <p>We'd like you to sort them into groups
            that make sense to you.</p>
          <p>There is no right or wrong answer. Just do what comes naturally.</p>
          <h3>Step 2</h3>
          <p>Drag an item from the left into this area to create your first group.</p>
        </span>
      </div>
      <div className="finish-explainer">
        <span>
          <h3>Step 3</h3>
          <p>When you feel like you are done, press the finish button.</p>
        </span>
      </div>
    </div>
  );
};

export default OnBoarding;
