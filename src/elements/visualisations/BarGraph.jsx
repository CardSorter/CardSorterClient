// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {useTranslations} from "next-intl";

const BarGraph = ({percentage, sub, total, entity, title, action}) => {
    const t = useTranslations("StudyPage");

  return (
    <div className="bar-graph-container">
      <p>{title}</p>
      <div className="graphic">
        <div className="completion" style={{height: percentage}}>
        </div>
        <div className="index" style={{bottom: percentage}}>
          <p>{percentage}</p>
        </div>
      </div>
      <div className="description">
        <p><span className="emphasized">{sub}</span> {t("out of")} <span
          className="emphasized">{total}</span> {entity}</p>
        <p>{action}</p>
      </div>
    </div>
  );
};

BarGraph.propTypes = {
  percentage: PropTypes.string.isRequired,
  sub: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  entity: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default BarGraph;
