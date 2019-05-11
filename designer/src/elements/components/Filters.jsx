// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../localization/LocalizedText';

const Filters = ({ongoing: ongoingAttr, completed: completedAttr}) => {
  let ongoingRef = './?filter=all';
  let completedRef = './?filter=all';
  let ongoingStyle = '';
  let completedStyle = '';

  if (ongoingAttr) {
    ongoingRef = './?filter=completed';
    ongoingStyle = 'active';
  }
  if (completedAttr) {
    completedRef = './?filter=ongoing';
    completedStyle = 'active';
  }

  return (
    <div className="filter-container">
      <p>{localizedText.text.filter}</p>
      {/* <a href={ongoingRef} className={ongoingStyle}>
        {localizedText.text.ongoing}</a>
      <a href={completedRef} className={completedStyle}>
        {localizedText.text.completed}</a> */}
      <a className={ongoingStyle}>
        {localizedText.text.ongoing}</a>
      <a className={completedStyle}>
        {localizedText.text.completed}</a>
    </div>
  );
};

Filters.propTypes = {
  ongoing: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Filters;
