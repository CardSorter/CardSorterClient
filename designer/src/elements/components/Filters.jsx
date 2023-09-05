// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../localization/LocalizedText';

const Filters = ({ ongoing: ongoingAttr, completed: completedAttr }) => {
  let ongoingRef = './?filter=all';
  let completedRef = './?filter=all';
  let ongoingStyle = '';
  let completedStyle = '';
  let allStyle='';

  if (ongoingAttr) {
    ongoingRef = './?filter=ongoing';
  }
  if (completedAttr) {
    completedRef = './?filter=completed';
  }
  if (window.location.search === '?filter=ongoing')
    ongoingStyle = 'active';
  else if (window.location.search === '?filter=completed')
    completedStyle = 'active';
  else 
    allStyle = 'active';
  

    return (
      <div className="filter-container">
        {/* <p>{localizedText.text.filter}</p> */}
        <a href={'/'} className={allStyle}> {"all"}</a>
        <a href={ongoingRef} className={ongoingStyle}>
          {localizedText.text.ongoing}</a>
        <a href={completedRef} className={completedStyle}>
          {localizedText.text.completed}</a>

        {/* {<a className={ongoingStyle}>
        {localizedText.text.ongoing}</a>
      <a className={completedStyle}>
        {localizedText.text.completed}</a>} */}
      </div>
    );
  };

  Filters.propTypes = {
    ongoing: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
  };

  export default Filters;
