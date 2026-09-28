import React from "react";
import { useSelector } from "react-redux";
import StateSchema from "reducers/StateSchema";
import styles from "./ProgressBar.module.scss";

const ProgressCount = () => {
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

  return (
    <span className={styles.progressCount}>
      {sortedCount} / {total}
    </span>
  );
};

export default ProgressCount;
