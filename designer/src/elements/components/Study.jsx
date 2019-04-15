import React from 'react';
import PropTypes from 'prop-types';

import StudyMenu from '../components/studyPageElements/StudyMenu.jsx';
import L from '../../localization/LocalizedText';

const Study = ({title, isLive, launched, menuValues, menuDispatch}) => (
  <div className="study-page">
    <span className="header">
      <h1>{title}</h1>
      <button className="edit"></button>
    </span>
    <span className="active">
      {
        isLive &&
        <div className="active-container">
          <span className='activeSquare isLive'></span>
          <p>{L.text.active}</p>
        </div>
      }
      {
        !isLive &&
        <div className="active-container">
          <span className='activeSquare notLive'></span>
          <p>{L.text.inactive}</p>
        </div>
      }
      <h2 className="date">{L.text.launchedOn} {launched.getDate()} {
        launched.getMonth()} {launched.getFullYear()}</h2>
    </span>
    <StudyMenu selectedNo={menuValues.selectedNo} onClicks=
      {menuDispatch.onClicks}/>
  </div>
);

Study.propTypes = {
  title: PropTypes.string.isRequired,
  isLive: PropTypes.bool.isRequired,
  launched: PropTypes.objectOf(Date).isRequired,
  menuValues: PropTypes.object.isRequired,
  menuDispatch: PropTypes.object.isRequired,
};

export default Study;
