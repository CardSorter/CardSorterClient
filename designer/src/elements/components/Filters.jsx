import React from 'react';
import PropTypes from 'prop-types';

import {filter, ongoing, completed} from '../../localization/text';

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
      <p>{filter()}</p>
      <a href={ongoingRef} className={ongoingStyle}>{ongoing()}</a>
      <a href={completedRef} className={completedStyle}>{completed()}</a>
    </div>
  );
};

Filters.propTypes = {
  ongoing: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Filters;
