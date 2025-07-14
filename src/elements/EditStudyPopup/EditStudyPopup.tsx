import React, {useState, ChangeEvent, MouseEvent, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as studyAction from "actions/studyPageAction";
import {useTranslations} from "next-intl";

const EditStudyPopup: React.FC = () => {
    const t = useTranslations("StudyPage");

    const [editTitle, setEditTitle] = useState("");
    const [editIsLive, setEditIsLive] = useState(false);
    const [editDescription, setEditDescription] = useState("");
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    // State
    const id = useSelector((state: StateSchema) => (state.study.id));
    const title = useSelector((state: StateSchema) => (state.study.title));
    const isLive = useSelector((state: StateSchema) => (state.study.isLive));
    const description = useSelector((state: StateSchema) => (state.study.description));

    // Dispatch
    const dispatch = useDispatch<any>();

    const onClose = () => dispatch(studyAction.toggleEditPopup({toggle: false}));


    useEffect(() => {
        setEditTitle(title);
        setEditIsLive(isLive || false);
        setEditDescription(description || "");
    }, [title, isLive, description]);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEditDescription(event.target.value);
    };

    const handleEditSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!id) {
            return;
        }

        dispatch(studyAction.updateStudy(id, { title: editTitle, isLive: editIsLive, description: editDescription }));
        dispatch(studyAction.toggleEditPopup({toggle: false}));
    };

    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsConfirmingDelete(true);
    };

    const handleConfirmDelete = () => {
        if (!id) {
            return;
        }

        dispatch(studyAction.deleteStudy(id));
        dispatch(studyAction.toggleEditPopup({toggle: false}));

        setIsConfirmingDelete(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmingDelete(false);
    };

    return (
      <div className="popup-container" onClick={onClose}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
              <div className="header">
                  <h2>{t("edit study")}</h2>
                  <button className="close-btn" onClick={onClose}>&#10005;</button>
              </div>
              <div className="content">
                  <form>
                      <div>
                          <label>{t("title")}:</label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={handleTitleChange}
                          />
                      </div>
                      {editDescription !== undefined && (
                        <div>
                            <label>{t("description")}:</label>
                            <textarea
                              value={editDescription}
                              onChange={handleDescriptionChange}
                            />
                        </div>
                      )}
                      <div>
                          <label>{t("is live")}</label>
                          <button
                            type="button"
                            className={`toggle-button ${editIsLive ? 'active' : 'inactive'}`}
                            onClick={() => setEditIsLive(!editIsLive)}
                          >
                              {editIsLive ? t("on") : t("off")}
                          </button>
                      </div>
                      <button type="submit" onClick={handleEditSubmit}>{t("save")}</button>
                      <button className="delete-btn" onClick={handleDelete}>{t("delete")}</button>
                      {isConfirmingDelete && (
                        <div className="confirm-delete">
                            <p>{t("confirm delete")}</p>
                            <button
                              className="confirm-btn"
                              onClick={handleConfirmDelete}
                            >
                                {t("confirm")}
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={handleCancelDelete}
                            >
                                {t("cancel")}
                            </button>
                        </div>
                      )}
                  </form>
              </div>
          </div>
      </div>
    );
};

export default EditStudyPopup;
