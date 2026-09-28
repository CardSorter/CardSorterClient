import React from "react";
import { useSelector } from "react-redux";
import StateSchema from "reducers/StateSchema";
import styles from "./ProgressBar.module.scss";

const ProgressBar = () => {
  const unsortedCards = useSelector(
    (state: StateSchema) => state.sortingBoard.unsortedCards,
  );
  const categories = useSelector(
    (state: StateSchema) => state.sortingBoard.categories,
  );

  const sortedCount = Object.values(categories).reduce(
    (acc, category) => acc + category.cards.length,
    0,
  );
  const total = sortedCount + unsortedCards.length;
  const percentage = total === 0 ? 0 : Math.round((sortedCount / total) * 100);

  return (
    <div className={styles.progressBarWrapper}>
      <div className={styles.progressBarTrack}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
