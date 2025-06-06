"use client"

import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as studyAction from "actions/studyPageAction";
import EditStudyPopup from "elements/EditStudyPopup";
import Popup from "elements/Popup";
import StudyMenu from "elements/StudyMenu";
import StateSchema from "reducers/StateSchema";
import {useParams} from "next/navigation";
import {useRouter} from "i18n/navigation";
import monthToString from "utils/monthToString";
import Image from "next/image";
import copyToClipboard from "utils/copyToClipboard";
import {createFromExistingStudy} from "actions/studyCreationAction";
import {useTranslations} from "next-intl";


export default function Layout({children}: {children: React.ReactNode }) {
  const {id} = useParams<{ id: string }>();
  const router = useRouter();
  const t = useTranslations("StudyPage");

  // State
  const NoParticipantsInStudy = useSelector((state: StateSchema) => state.study.noParticipants);
  const editPopupOpen = useSelector((state: StateSchema) => state.study.editPopupOpen);
  const showPopup = useSelector((state: StateSchema) => state.study.popupShowing);
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

  const openEditPopup = () => dispatch(studyAction.toggleEditPopup({toggle: true}));

  const openPopup = () => dispatch(studyAction.togglePopup({toggle: true}));
  const closePopup = () => dispatch(studyAction.togglePopup({toggle: false}));
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

  const onCopyUrl = () => {
    copyToClipboard(process.env.NEXT_PUBLIC_BASE_URL + `/sort/${id}`);
  }

  // Load study
  useEffect(() => {
    loadStudy(id);
    loadClusters(id);
  }, [id]);

  return (
    <>
      <div className="study-page">
        {/* Header */}
        <span className="header">
          <h1>{title}</h1>
          <button className="edit" onClick={openEditPopup} title="Edit study"><span className="material-symbols-outlined">edit</span></button>
          <button className="share" onClick={openPopup} title="Share study"><span className="material-symbols-outlined">share</span></button>
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

        {showPopup && (
          <Popup
            title={t("share url")}
            url={process.env.NEXT_PUBLIC_BASE_URL + `/sort/${id}`}
            iconClass="share"
            close={closePopup}
          />
        )}
        {editPopupOpen && (
          <EditStudyPopup />
        )}

        {
          NoParticipantsInStudy &&
            <div className="no-participants-page">
              <h1>{t("no participants")}</h1>
              <Image src="/card-sorter/images/empty.svg" alt="Nothing found" height={150} width={150} />
              <div className="actions-container">
                <div className="url-container">
                  <a className="url" href={process.env.NEXT_PUBLIC_BASE_URL + `/sort/${id}`} target="_blank">
                    {process.env.NEXT_PUBLIC_BASE_URL + `/sort/${id}`}
                  </a>
                  <button className="copy" type="button" onClick={onCopyUrl}>
                      <span className="material-symbols-outlined">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
        }
        {
          !NoParticipantsInStudy &&
            <>
              <StudyMenu/>
              {children}
            </>
        }
      </div>
    </>
  )
}