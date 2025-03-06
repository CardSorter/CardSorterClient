import React, {useState, ChangeEvent, MouseEvent} from 'react';
import L from 'localization/LocalizedText';

type EditPopupProps = {
    title: string | undefined;
    initialTitle: string;
    initialIsLive: boolean;
    initialDescription?: string;
    onSave: (title: string, isLive: boolean, description?: string) => void;
    onClose: () => void;
    onDelete: () => void;
};

const EditPopup: React.FC<EditPopupProps> = ({
                                                 title,
                                                 initialTitle,
                                                 initialIsLive,
                                                 initialDescription,
                                                 onSave,
                                                 onClose,
                                                 onDelete
                                             }) => {
    const [editTitle, setEditTitle] = useState(initialTitle);
    const [editIsLive, setEditIsLive] = useState(initialIsLive);
    const [editDescription, setEditDescription] = useState(initialDescription);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEditDescription(event.target.value);
    };

    const handleEditSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSave(editTitle, editIsLive, editDescription);
    };

    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsConfirmingDelete(true);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setIsConfirmingDelete(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmingDelete(false);
    };

    return (
      <div className="popup-container" onClick={onClose}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
              <div className="header">
                  <h2>{title}</h2>
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
