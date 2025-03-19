import React from 'react';
import {useRouter} from "i18n/navigation";

import monthToString from '../utils/monthToString';
import {useTranslations} from "next-intl";

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
  const t = useTranslations("StudiesListPage");
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
            <p className='completed'>{completedNo} {t("completed")}</p>
            <p className='abandoned'>{abandonedNo} {t("abandoned")}</p>
          </div>
          <div className='dates'>
            <p className='launched'>
              {t("launched on")}&nbsp;<time
                dateTime={launchedDate.toDateString()}>{launchedDate.getDate()}
              <span className="capitalize">
              <> </>{monthToString(launchedDate.getMonth(), t)}
            </span>
              <> </>{launchedDate.getFullYear()}</time>
            </p>
            {/* If the endDate is defined show only the end and the launched date */}
            {
                (!endDate && editDate) &&
                <p className='edited'>
                  {t("edited on")}&nbsp;
                  <time dateTime={editDate.toDateString()}>{editDate.getDate()}
                  <span className="capitalize">
                    <> </>{monthToString(editDate.getMonth(), t)}
                  </span>
                  <> </>{editDate?.getFullYear()}</time>
                </p>
            }
            {
              (endDate && editDate) &&
                <p className='ended'>
                  {t("ended on")}
                  <time dateTime={endDate.toDateString()}>{endDate.getDate()}
                  <span className="capitalize">
                    <> </>{monthToString(endDate.getMonth(), t)}
                  </span>
                  <> </>{endDate.getFullYear()}</time>
                </p>
            }
          </div>
        </li>
      </div>
  );
}
