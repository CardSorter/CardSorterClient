import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SortHint = ({ showDuration }) => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHint(false);
    }, showDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [showDuration]);

  return (
    <div className={`sort-hint ${showHint ? 'show' : ''}`}>
      <div className="arrow"></div>
      Click on the category headers to sort them
    </div>
  );
};

SortHint.propTypes = {
  showDuration: PropTypes.number.isRequired,
};

export default SortHint;
