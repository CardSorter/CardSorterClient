import React from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';

const StudyMenu = ({selectedNo, onClicks}) => {
  const styles = [];
  for (let i = 0; i < 5; i++) {
    styles[i] = '';
  }
  styles[selectedNo] = 'selected';

  return (
    <div className="study-menu">
      <button onClick={onClicks.participant} className={styles[0]}>
        {L.text.participant}</button>
      <button onClick={onClicks.cards} className={styles[1]}>
        {L.text.cards}</button>
      <button onClick={onClicks.categories} className={styles[2]}>
        {L.text.categories}</button>
      <button onClick={onClicks.similarityMatrix} className={styles[3]}>
        {L.text.similarityMatrix}</button>
      <button onClick={onClicks.clusters} className={styles[4]}>
        {L.text.clusters}</button>
    </div>);
};

StudyMenu.propsTypes = {
  selectedNo: PropTypes.number.isRequired,
  onClick: PropTypes.object.isRequired,
};

export default StudyMenu;
