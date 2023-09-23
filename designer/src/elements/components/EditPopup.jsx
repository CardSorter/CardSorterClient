
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editTitle: props.initialTitle,
            editIsLive: props.initialIsLive,
            editDescription: props.initialDescription,
            isConfirmingDelete: false,
        };
    }

    handleTitleChange = (event) => {
        this.setState({
            editTitle: event.target.value,
        });
    };
    handleDescriptionChange = (event) => {
        this.setState({
            editDescription: event.target.value,
        });
    }


    handleEditSubmit = (event) => {
        event.preventDefault();
        const { editTitle, editIsLive, editDescription } = this.state;
        this.props.onSave(editTitle, editIsLive, editDescription);

    };
    handleDelete = (event) => {
        event.preventDefault();
        this.setState({
            isConfirmingDelete: true, // Show the confirmation message
        });
    }

    handleConfirmDelete = () => {
        this.props.onDelete();
        this.setState({
            isConfirmingDelete: false, // Hide the confirmation message
        });
    }

    handleCancelDelete = () => {
        this.setState({
            isConfirmingDelete: false, // Hide the confirmation message
        });
    }

    render() {
        const { editTitle, editIsLive, editDescription } = this.state;

        return (
            <div className="popup-container" onClick={this.props.onClose}>
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <div className="header">
                        <h2>{this.props.title}</h2>
                        <button className="close-btn" onClick={this.props.onClose}>&#10005;</button>
                    </div>
                    <div className="content">
                        <form>
                            <div>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={this.state.editTitle}
                                    onChange={this.handleTitleChange}
                                />
                            </div>
                            {this.state.editDescription !== undefined && (
                                <div>
                                    <label>Description:</label>
                                    <textarea
                                        value={this.state.editDescription}
                                        onChange={this.handleDescriptionChange}
                                    />
                                </div>
                            )
                            }
                            <div>
                                <label>Is Live:</label>
                                <button
                                    type="button"
                                    className={`toggle-button ${editIsLive ? 'active' : 'inactive'}`}
                                    onClick={() => this.setState({ editIsLive: !editIsLive })}
                                >
                                    {editIsLive ? 'On' : 'Off'}{/*hardcode*/}
                                </button>
                            </div>
                            <button type="submit" onClick={this.handleEditSubmit}>Save</button>
                            <button className="delete-btn" onClick={this.handleDelete}>Delete</button>
                            {this.state.isConfirmingDelete ? (
                                <div className="confirm-delete">
                                    <p>Are you sure you want to delete this study? This action cannot be undone.</p>
                                    <button className="confirm-btn" onClick={this.handleConfirmDelete}>Confirm</button>
                                    <button className="cancel-btn" onClick={this.handleCancelDelete}>Cancel</button>
                                </div>
                            ) : null}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditPopup.propTypes = {
    title: PropTypes.string.isRequired,
    initialTitle: PropTypes.string.isRequired,
    initialIsLive: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default EditPopup;