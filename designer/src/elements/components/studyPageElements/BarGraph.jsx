import React from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';

const BarGraph = ({percentage, sub, total}) => {
  return (
    <div className="bar-graph-container">
      <p>{L.text.completion}</p>
      <div className="graphic">
        <div className="completion" style={{height: percentage}}>
        </div>
        <div className="index" style={{bottom: percentage}}>
          <p>{percentage}</p>
        </div>
      </div>
      <div className="description">
        <p><span className="emphasized">{sub}</span> {L.text.outOf} <span
          className="emphasized">{total}</span> {L.text.users}</p>
        <p>{L.text.completedTheStudy}</p>
      </div>
    </div>
  );
};

BarGraph.propTypes = {
  percentage: PropTypes.string.isRequired,
  sub: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default BarGraph;
