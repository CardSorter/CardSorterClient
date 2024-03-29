/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-invalid-this */
import {connect} from 'react-redux';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendSort, endSort, closeConfirmPopUp } from '../../actions/uiAction';
import L from '../../localization/LocalizedText';

class ConfirmPopUp extends Component {
    constructor(props) {
        super(props);
    }

    handleConfirmFinish = () => {
        this.props.dispatch(endSort());
        this.props.dispatch(sendSort(this.props.studyID, this.props.container, this.props.categories, this.props.timeStarted, Date.now(), this.props.comment));
    }

    onClose = () => {
        this.props.dispatch(closeConfirmPopUp());
    }

    render() {
        const { unSorted } = this.props;
        return (
            <div className="popup-container" onClick={this.onClose}>
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <div className="content">
                        {unSorted ?
                            <p>{L.text.confirmFinishUnSorted}</p>
                            : <p>{L.text.confirmFinish}</p>}
                    </div>
                    <div className="button-container">
                        <button className="confirm-btn" onClick={this.handleConfirmFinish}>{L.text.confirm}</button>
                        <button className="cancel-btn" onClick={this.onClose}>{L.text.cancel}</button>
                    </div>

                </div>
            </div>
        );
    }
}
ConfirmPopUp.propTypes = {
    studyID: PropTypes.string.isRequired,
    container: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired,
    timeStarted: PropTypes.number.isRequired,
    comment: PropTypes.string,
    unSorted: PropTypes.bool.isRequired,
};

export default connect()(ConfirmPopUp);
