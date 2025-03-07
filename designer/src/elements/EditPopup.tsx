import React, {useState, ChangeEvent, MouseEvent, useEffect} from 'react';
import L from 'localization/LocalizedText';
import {useDispatch, useSelector} from "react-redux";
import StateSchema from "reducers/StateSchema";
import * as studyAction from "../actions/studyPageAction";

const EditPopup: React.FC = () => {
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
                  <h2>{L?.text?.editStudy}</h2>
                  <button className="close-btn" onClick={onClose}>&#10005;</button>
              </div>
              <div className="content">
                  <form>
                      <div>
                          <label>{L?.text?.title}:</label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={handleTitleChange}
                          />
                      </div>
                      {editDescription !== undefined && (
                        <div>
                            <label>{L?.text?.description}:</label>
                            <textarea
                              value={editDescription}
                              onChange={handleDescriptionChange}
                            />
                        </div>
                      )}
                      <div>
                          <label>Is Live:</label>
                          <button
                            type="button"
                            className={`toggle-button ${editIsLive ? 'active' : 'inactive'}`}
                            onClick={() => setEditIsLive(!editIsLive)}
                          >
                              {editIsLive ? L?.text?.on : L?.text?.off}
                          </button>
                      </div>
                      <button type="submit" onClick={handleEditSubmit}>{L?.text?.save}</button>
                      <button className="delete-btn" onClick={handleDelete}>{L?.text?.delete}</button>
                      {isConfirmingDelete && (
                        <div className="confirm-delete">
                            <p>{L?.text?.confirmDelete}</p>
                            <button
                              className="confirm-btn"
                              onClick={handleConfirmDelete}
                            >
                                {L?.text?.Confirm}
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={handleCancelDelete}
                            >
                                {L?.text?.Cancel}
                            </button>
                        </div>
                      )}
                  </form>
              </div>
          </div>
      </div>
    );
};

export default EditPopup;
