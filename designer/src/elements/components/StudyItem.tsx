import React from 'react';
import {useRouter} from "next/navigation";

import localizedText from '../../localization/LocalizedText';
import monthToString from '../../utils/monthToString';

interface StudyItemProps {
  id: string;
  title: string;
  isLive: boolean;
  completedNo: number;
  abandonedNo: number;
  launchedDate: Date;
  editDate?: Date;
  endDate?: Date;
}


export default function StudyItem({ id, title, isLive, completedNo, abandonedNo, launchedDate, editDate, endDate}: StudyItemProps) {
  const router = useRouter();

  // TODO: Convert to Link or add link for accessibility
  return(
      <div>
        <li className='studyItem' onClick={() => router.push('/study/' + id)} >
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
            <p className='completed'>{completedNo} {localizedText?.text?.completed}</p>
            <p className='abandoned'>{abandonedNo} {localizedText?.text?.abandonded}</p>
          </div>
          <div className='dates'>
            <p className='launched'>
              {localizedText?.text?.launchedOn} <time
                dateTime={launchedDate.toDateString()}>{launchedDate.getDate()}
              <span className="capitalize">
              <> </>{monthToString(launchedDate.getMonth())}
            </span>
              <> </>{launchedDate.getFullYear()}</time>
            </p>
            {/* If the endDate is defined show only the end and the launched date */}
            {
                (!endDate && editDate) &&
                <p className='edited'>
                  {localizedText?.text?.editedOn}
                  <time dateTime={editDate.toDateString()}>{editDate.getDate()}
                  <span className="capitalize">
                    <> </>{monthToString(editDate.getMonth())}
                  </span>
                  <> </>{editDate?.getFullYear()}</time>
                </p>
            }
            {
              (endDate && editDate) &&
                <p className='ended'>
                  {localizedText?.text?.endedOn}
                  <time dateTime={endDate.toDateString()}>{endDate.getDate()}
                  <span className="capitalize">
                    <> </>{monthToString(endDate.getMonth())}
                  </span>
                  <> </>{endDate.getFullYear()}</time>
                </p>
            }
          </div>
        </li>
      </div>
  );
}
