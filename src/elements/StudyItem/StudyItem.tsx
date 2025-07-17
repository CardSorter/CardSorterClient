import React from 'react';
import {useRouter} from "i18n/navigation";

import monthToString from '../../utils/monthToString';
import {useTranslations} from "next-intl";
import styles from "./StudyItem.module.scss";

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
        <li className={styles.studyItem} onClick={() => router.push('/study/' + id)} >
          <div className={styles.header}>
            {
                isLive &&
                <span className={`${styles.activeSquare} ${styles.isLive}`}></span>
            }
            {
                !isLive &&
                <span className={`${styles.activeSquare} ${styles.notLive}`}></span>

            }
            <h3>{title}{" "}</h3>
          </div>

          <div className={styles.participants}>
            <p className={styles.completed}>{completedNo} {t("completed")}</p>
            <p>{abandonedNo} {t("abandoned")}</p>
          </div>

          <div className={styles.dates}>
            <p className={styles.launched}>
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
                <p>
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
                <p>
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
