import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StateSchema from "reducers/StateSchema";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import * as uiAction from "actions/sorting/uiAction";
import { playSound } from "utils/audio/sounds";

const OnBoardingPartOne = () => {
  // Dispatch
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(uiAction.toggleOnBoardingPartOne(false));
    dispatch(uiAction.showAllCards(true));
  };

  const [nextStep, setNextStep] = useState(-1);
  const title = useSelector((state: StateSchema) => state.sortingUi.studyTitle);
  const description = useSelector(
    (state: StateSchema) => state.sortingUi.studyDescription,
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setNextStep(-1);
      playSound("swoosh");
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="on-boarding-screen">
      <div
        className={
          nextStep === -1 ? "start-explainer" : "start-explainer hidden"
        }
      >
        <Button
          onClick={() => {
            setNextStep(0);
            playSound("swoosh");
          }}
        >
          <h3 style={{ marginBottom: 0 }}>Start</h3>
        </Button>
      </div>
      <div
        className={
          nextStep === 0
            ? "description-explainer"
            : "description-explainer hidden"
        }
      >
        <span>
          <span className="step">
            <h3>{title}</h3>
          </span>
          <div className="step-explainer">
            <p>{description}</p>
          </div>
          <div className="ok-btn">
            <Button
              onClick={() => {
                setNextStep(1);
                playSound("swoosh");
              }}
            >
              Let's go!
            </Button>
          </div>
        </span>
      </div>
      <div
        className={nextStep === 1 ? "list-explainer" : "list-explainer hidden"}
      >
        <span>
          <span className="step">
            <h3>Step 1</h3>
          </span>
          <div className="step-explainer">
            <p>
              Take a quick look at the <b>cards.</b>
            </p>
            <p>Then, sort them into groups that make sense to you.</p>
            <p>There is no right or wrong answer.</p>
            <p>
              <b> Just do what comes naturally.</b>
            </p>
          </div>
          <div className="ok-btn">
            <Button
              onClick={(e) => {
                onClick(e);
                setNextStep(2);
              }}
            >
              Ok
            </Button>
          </div>
        </span>
      </div>
    </div>
  );
};

export default OnBoardingPartOne;
