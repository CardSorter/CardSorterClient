import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import * as uiAction from "actions/sorting/uiAction";
import { playSound } from "utils/audio/sounds";

const OnBoardingPartTwo = () => {
  // Dispatch
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(uiAction.toggleOnBoarding(false));
    dispatch(uiAction.toggleOnBoardingPartOne(false));
    dispatch(uiAction.toggleOnBoardingPartTwo(false));
  };

  const [nextStep, setNextStep] = useState(3);
  playSound("swoosh");

  return (
    <div className="on-boarding-screen">
      <div
        className={
          nextStep === 3 ? "board-explainer " : "board-explainer hidden"
        }
      >
        <span>
          <span className="step">
            <h3>Step 2</h3>
          </span>
          <div className="step-explainer">
            <p>
              Drag a <b>card</b> into this area to create your{" "}
              <b>first group</b>. You can reorder groups by dragging them
              around, and give each one a color using the <b>color picker</b>{" "}
              button.
            </p>
          </div>
          <div className="ok-btn">
            <Button
              onClick={() => {
                setNextStep(4);
                playSound("swoosh");
                dispatch(uiAction.toggleBoardingFinalStep(true));
              }}
            >
              Ok i'm ready
            </Button>
          </div>
        </span>
      </div>

      <div
        className={
          nextStep === 4 ? "finish-explainer" : "finish-explainer hidden"
        }
      >
        <span>
          <span className="step">
            <h3>Step 3</h3>
          </span>
          <div className="step-explainer">
            <p>
              When you're done, click <b>“Finish”</b> to submit your sorting.
              You can also share a comment about your experience!
            </p>
          </div>
          <div className="ok-btn">
            <Button
              onClick={(e) => {
                setNextStep(0);
                onClick(e);
              }}
            >
              Ok i'm ready
            </Button>
          </div>
        </span>
      </div>
    </div>
  );
};

export default OnBoardingPartTwo;
