/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import React, {Component} from 'react';
import {toggleDescriptionPopup} from "../../actions/uiAction";
import PropTypes from 'prop-types';
import {connect}  from 'react-redux';

class DescriptionPopup extends Component {
    constructor(props) {
        super(props);
    }
    onClose = () => {
        this.props.dispatch(toggleDescriptionPopup(false));
    }
    render() {
        const { title, description } = this.props;
        return (
            <div className="popup-container">
                <div className="popup" >
                    <h1>{title}</h1>
                    <h3>{description}</h3>
                    <div className="btn-container">
                        <button type="button" className="btn--secondary cancel"
                            onClick={this.onClose}>
                            <p>close</p>
                        </button>
                    </div>
                </div>
            </div >
        );
    };
}

DescriptionPopup.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default connect()(DescriptionPopup);
