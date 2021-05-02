import React from 'react';

import monthToString from '../../helpers/monthToString';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {FormattedMessage} from "react-intl";

export interface StudyItemState {
  id: number,
  title: string,
  isLive: boolean,
  abandonedNo: number,
  completedNo: number,
  launchedDate: Date,
  editDate: Date,
  endDate: Date,
}

const StudyItem: React.FC<StudyItemState> = ({title, isLive, completedNo, abandonedNo, launchedDate, editDate, endDate, id}) => (
  <li className='studyItem mb-l'>
    <div className='content'>
      <Typography variant='h2'>{title}</Typography>
      {
        isLive &&
        <Typography variant='button' className='status isLive'><FormattedMessage id='studyItem.active' /></Typography>
      }
      {
        !isLive &&
        <Typography variant='button' className='status notLive'><FormattedMessage id='studyItem.inactive' /></Typography>

      }
      <div className='participants'>
        <Typography variant='subtitle1' className='completed'>{completedNo} <FormattedMessage id='completed' /></Typography>
        <Typography variant='subtitle1'>&nbsp;|&nbsp;</Typography>
        <Typography variant='subtitle1' className='abandoned'>{abandonedNo} <FormattedMessage id='abandoned' /></Typography>
      </div>
      <div className='dates'>
        <Typography variant='body2' className='launched'>
          <FormattedMessage id='launchedOn' />
          &nbsp;
          <time dateTime={launchedDate.toDateString()}>
            {launchedDate.getDate()}
            <span className="capitalize">&nbsp;{monthToString(launchedDate.getMonth())}&nbsp;</span>
            {launchedDate.getFullYear()}
          </time>
        </Typography>
        {/* If the endDate is defined show only the end and the launched date */}
        {
          !endDate &&
          <Typography variant='body2' className='edited'>
            <FormattedMessage id='editedOn' />
            &nbsp;
            <time dateTime={editDate.toDateString()}>
              {editDate.getDate()}
              <span className="capitalize">&nbsp;{monthToString(editDate.getMonth())}&nbsp;</span>
              {editDate.getFullYear()}
            </time>
          </Typography>
        }
        {
          endDate &&
          <Typography variant='body2' className='ended'>
            <FormattedMessage id='endedOn' />
            &nbsp;
            <time dateTime={endDate.toDateString()}>
              {endDate.getDate()}
              <span className="capitalize">&nbsp;{monthToString(endDate.getMonth())}&nbsp;</span>
              {endDate.getFullYear()}
            </time>
          </Typography>
        }
      </div>
    </div>
    <Link to={`/study/${id}`}/>
  </li>
);

export default StudyItem;

