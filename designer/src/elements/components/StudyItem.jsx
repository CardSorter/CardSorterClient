import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../localization/LocalizedText';

const StudyItem = ({title, isLive, completedNo, abandonedNo,
  launcedDate, editDate, endDate}) => (
  <li className='studyItem'>
    <div className='header'>
      <h3>{title}</h3>
      {
        isLive &&
        <span className='activeSquare isLive'></span>
      }
      {
        !isLive &&
        <span className='activeSquare notLive'></span>
      }
    </div>
    <div className='participants'>
      <p className='completed'>{completedNo} {localizedText.text.completed}</p>
      <p className='abandoned'>{abandonedNo} {localizedText.text.abandonded}</p>
    </div>
    <div className='dates'>
      <p className='launched'>
        {localizedText.text.launchedOn} <time
          dateTime={launcedDate}>{launcedDate.getDate()} {launcedDate.getMonth()} {launcedDate.getFullYear()}</time>
      </p>
      {/* If the endDate is defined show only the end and the launched date */}
      {
        !endDate &&
        <p className='edited'>
          {localizedText.text.editedOn} <time
            dateTime={editDate}>{editDate.getDate()} {editDate.getMonth()} {editDate.getFullYear()}</time>
        </p>
      }
      {
        endDate &&
        <p className='ended'>
          {localizedText.text.endedOn} <time
            dateTime={endDate}>{endDate.getDate()} {endDate.getMonth()} {endDate.getFullYear()}</time>
        </p>
      }
    </div>
  </li>
);

StudyItem.propTypes = {
  title: PropTypes.string.isRequired,
  isLive: PropTypes.bool.isRequired,
  completedNo: PropTypes.number.isRequired,
  abandonedNo: PropTypes.number.isRequired,
  launcedDate: PropTypes.instanceOf(Date).isRequired,
  editDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

export default StudyItem;

