"use client"

import "./study.scss";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as studyAction from "actions/studyPageAction";
import Popup from "elements/Popup/Popup";
import StudyMenu from "elements/StudyMenu/StudyMenu";
import StateSchema from "reducers/StateSchema";
import {useParams} from "next/navigation";
import {usePathname, useRouter} from "i18n/navigation";
import monthToString from "utils/monthToString";
import Image from "next/image";
import {createFromExistingStudy} from "actions/studyCreationAction";
import {useTranslations} from "next-intl";
import ApplicationAlerts from "../../../../elements/ApplicationAlerts/ApplicationAlerts";
import {ApplicationAlertContext} from "../../../../reducers/applicationAlertsReducer";
import InputWithCopy from "../../../../elements/InputWithCopy/InputWithCopy";


export default function Layout({children}: {children: React.ReactNode }) {
  const {id} = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("StudyPage");
  const [sharePopupShowing, setSharePopupShowing] = useState(false);

  // State
  const NoParticipantsInStudy = useSelector((state: StateSchema) => state.study.noParticipants);
  const title = useSelector((state: StateSchema) => state.study.title);
  const description = useSelector((state: StateSchema) => state.study.description);
  const cards = useSelector((state: StateSchema) => state.study.cards);
  const isLive = useSelector((state: StateSchema) => state.study.isLive);
  const launchedDate = useSelector((state: StateSchema) => state.study.launchedDate);
  const sortType = useSelector((state: StateSchema) => state.sortingUi?.sortType ?? 'open');

  // Dispatch
  const dispatch = useDispatch<any>();

  const loadStudy =  (id: string) => dispatch(studyAction.fetchStudy(id));
  const loadClusters = (id: string) => dispatch(studyAction.fetchClusters(id));
  const downloadXLSX = () => dispatch(studyAction.downloadXLSX({studyId: id}));

  const onDuplicateStudy = () => {
    dispatch(createFromExistingStudy({
      title: title,
      description: description,
      cards: cards.data.map((i) => ({
        name: i.name,
        description: i.description,
      }))
    }))

    router.push(`/create`);
  }

  // Load study
  useEffect(() => {
    loadStudy(id);
    loadClusters(id);
  }, [id]);

  const studyHeader = (
    <>
      <span className="header">
        <h1>{title}</h1>
        <button className="edit" onClick={() => router.push(`/study/${id}/edit`)} title="Edit study"><span className="material-symbols-outlined">edit</span></button>
        <button className="share" onClick={() => setSharePopupShowing(true)} title="Share study"><span className="material-symbols-outlined">share</span></button>
        <button className="copy" onClick={onDuplicateStudy} title="Duplicate study">
          <span className="material-symbols-outlined">content_paste_go</span>
        </button>
        {!NoParticipantsInStudy && (
          <>
            <button className="download" onClick={downloadXLSX} title="Download study Data">
              <span className="material-symbols-outlined">download</span>
            </button>
          </>
        )}
      </span>
      <span className="active">
        {isLive ? (
          <div className="active-container">
            <span className="activeSquare isLive"></span>
            <p>{t("active")}</p>
          </div>
        ) : (
          <div className="active-container">
            <span className="activeSquare notLive"></span>
            <p>{t("inactive")}</p>
          </div>
        )}
        <h2 className="date">
          {t("launched on")} {launchedDate?.getDate()}
          <span className="capitalize">
            <> </>
            {monthToString(launchedDate?.getMonth(), t)}
          </span>
          <> </>
          {launchedDate?.getFullYear()}
        </h2>
      </span>
    </>
  )

  return (
    <>
      <div className="study-page">
        <ApplicationAlerts context={ApplicationAlertContext.studyPage} />

        {
          !pathname.includes("edit") &&
            studyHeader
        }

        <Popup
          title={t("share url")}
          url={process.env.NEXT_PUBLIC_BASE_URL + `/sort/${id}`}
          onClose={() => setSharePopupShowing(false)}
          open={sharePopupShowing}
        />

        {
          NoParticipantsInStudy && !pathname.includes("edit") &&
            <div className="no-participants-page">
              <h1>{t("no participants")}</h1>
              <Image src="/card-sorter/images/empty.svg" alt="Nothing found" height={150} width={150} />

              <div className="actions-container">
                <InputWithCopy inputText={process.env.NEXT_PUBLIC_BASE_URL + `/sort/${id}`} title={t("share url")} />
              </div>
            </div>
        }
        {
          !NoParticipantsInStudy && !pathname.includes("edit") &&
            <>
              <StudyMenu/>
              {children}
            </>
        }
        {
          pathname.includes("edit") &&
          <>{children}</>
        }
      </div>
    </>
  )
}