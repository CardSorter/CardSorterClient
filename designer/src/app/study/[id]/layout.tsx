"use client"

import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as studyAction from "actions/studyPageAction";
import EditPopup from "elements/EditPopup";
import Popup from "elements/Popup";
import L from "localization/LocalizedText";
import StudyMenu from "elements/StudyMenu";
import StateSchema from "reducers/StateSchema";
import {useParams, useRouter} from "next/navigation";
import monthToString from "utils/monthToString";
import Image from "next/image";
import copyToClipboard from "utils/copyToClipboard";
import {createFromExistingStudy} from "actions/studyCreationAction";


export default function Layout({children}: {children: React.ReactNode }) {
  const {id} = useParams<{ id: string }>();
  const router = useRouter();

  // State
  const NoParticipantsInStudy = useSelector((state: StateSchema) => state.study.noParticipants);
  const editPopupOpen = useSelector((state: StateSchema) => state.study.editPopupOpen);
  const editPopupTitle = useSelector((state: StateSchema) => state.study.editPopupTitle);
  const editPopupIsLive = useSelector((state: StateSchema) => state.study.editPopupIsLive);
  const editPopupDescription = useSelector((state: StateSchema) => state.study.editPopupDescription);
  const showPopup = useSelector((state: StateSchema) => state.study.popupShowing);
  const title = useSelector((state: StateSchema) => state.study.title);
  const description = useSelector((state: StateSchema) => state.study.description);
  const cards = useSelector((state: StateSchema) => state.study.cards);
  const isLive = useSelector((state: StateSchema) => state.study.isLive);
  const launchedDate = useSelector((state: StateSchema) => state.study.launchedDate);


  // Dispatch
  const dispatch = useDispatch<any>();

  const loadStudy =  (id: string) => dispatch(studyAction.fetchStudy(id));
  const loadClusters = (id: string) => dispatch(studyAction.fetchClusters(id));

  const saveEditPopup = (title: string, isLive: boolean, description?: string) => {
    dispatch(studyAction.updateStudy(id, { title: title, isLive: isLive, description: description }));
    dispatch(studyAction.toggleEditPopup({toggle: false}));
  }

  const openEditPopup = () => dispatch(studyAction.toggleEditPopup({toggle: true}));

  const closeEditPopup = () => dispatch(studyAction.toggleEditPopup({toggle: false}));

  const deleteEditPopup = () => {
    dispatch(studyAction.deleteStudy(id));
    dispatch(studyAction.toggleEditPopup({toggle: false}));
  };

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
          <button className="edit" onClick={openEditPopup}><span className="material-symbols-outlined">edit</span></button>
          <button className="share" onClick={openPopup}><span className="material-symbols-outlined">share</span></button>
          <button className="copy" onClick={onDuplicateStudy}>
            <span className="material-symbols-outlined">content_paste_go</span>
          </button>
          {!NoParticipantsInStudy && (
            <>
              <button className="download" onClick={downloadXLSX}>
                <span className="material-symbols-outlined">download</span>
              </button>
            </>
          )}
        </span>
        <span className="active">
          {isLive ? (
            <div className="active-container">
              <span className="activeSquare isLive"></span>
              <p>{L?.text?.active}</p>
            </div>
          ) : (
            <div className="active-container">
              <span className="activeSquare notLive"></span>
              <p>{L?.text?.inactive}</p>
            </div>
          )}
          <h2 className="date">
            {L?.text?.launchedOn} {launchedDate?.getDate()}
            <span className="capitalize">
              <> </>
              {monthToString(launchedDate?.getMonth())}
            </span>
            <> </>
            {launchedDate?.getFullYear()}
          </h2>
        </span>

        {showPopup && (
          <Popup
            title={L?.text?.shareThisUrlWithTheParticipants}
            url={process.env.NEXT_PUBLIC_BASE_URL + `/sort/${id}`}
            iconClass="share"
            close={closePopup}
          />
        )}
        {editPopupOpen && (
          <EditPopup
            title={L?.text?.editStudy}
            initialTitle={editPopupTitle}
            initialIsLive={editPopupIsLive}
            initialDescription={editPopupDescription}
            onSave={saveEditPopup}
            onClose={closeEditPopup}
            onDelete={deleteEditPopup}
          />
        )}

        {
          NoParticipantsInStudy &&
            <div className="no-participants-page">
              <h1>{L?.text?.noParticipantsYet}</h1>
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