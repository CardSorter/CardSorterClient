// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import L from '../../localization/LocalizedText';

const Filters = ({ ongoing: ongoingAttr, completed: completedAttr }) => {
  let ongoingRef = './?filter=all';
  let completedRef = './?filter=all';
  let ongoingStyle = '';
  let completedStyle = '';
  let allStyle = '';

  if (ongoingAttr) {
    ongoingRef = './?filter=ongoing';
  }
  if (completedAttr) {
    completedRef = './?filter=completed';
  }
  if (window.location.search === '?filter=ongoing') {
    ongoingStyle = 'active';
  } else if (window.location.search === '?filter=completed') {
    completedStyle = 'active';
  } else {
    allStyle = 'active';
  }

  let redirectUrl = '/';
  if (process.env.NODE_ENV === 'production') {
    redirectUrl = '/card-sorter/';
  }
  return (
    <div className="filter-container">
      <a href={redirectUrl} className={allStyle}> {L.text.all}</a>
      <a href={ongoingRef} className={ongoingStyle}>
        {L.text.ongoing}</a>
      <a href={completedRef} className={completedStyle}>
        {L.text.completed}</a>

    </div>
  );
};

Filters.propTypes = {
  ongoing: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Filters;
