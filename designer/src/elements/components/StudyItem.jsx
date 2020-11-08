// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../localization/LocalizedText';
import monthToString from '../../helpers/monthToString';

const StudyItem = ({title, isLive, completedNo, abandonedNo,
  launchedDate, editDate, endDate, onClick}) => (
  <li className='studyItem' onClick={onClick}>
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
          dateTime={launchedDate}>{launchedDate.getDate()}
          <span className="capitalize">
            <> </>{monthToString(launchedDate.getMonth())}
          </span>
          <> </>{launchedDate.getFullYear()}</time>
      </p>
      {/* If the endDate is defined show only the end and the launched date */}
      {
        !endDate &&
        <p className='edited'>
          {localizedText.text.editedOn} <time
          // eslint-disable-next-line max-len
            dateTime={editDate}>{editDate.getDate()}
            <span className="capitalize">
              <> </>{monthToString(editDate.getMonth())}
            </span>
            <> </>{editDate.getFullYear()}</time>
        </p>
      }
      {
        endDate &&
        <p className='ended'>
          {localizedText.text.endedOn} <time
          // eslint-disable-next-line max-len
            dateTime={endDate}>{endDate.getDate()}
            <span className="capitalize">
              <> </>{monthToString(endDate.getMonth())}
            </span>
            <> </>{endDate.getFullYear()}</time>
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
  launchedDate: PropTypes.instanceOf(Date).isRequired,
  editDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onClick: PropTypes.func.isRequired,
};

export default StudyItem;

