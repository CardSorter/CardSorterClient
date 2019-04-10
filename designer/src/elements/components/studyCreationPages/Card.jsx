import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../../localization/LocalizedText';

const Card = ({name, description, onNameChange, onDescriptionChange}) => (
  <div className="card">
    <input type="text" placeholder={name ||
      localizedText.text.cardName} onChange={(e) => onNameChange(e)}></input>
    <input type="text" placeholder={description ||
      localizedText.text.description} onChange={(e) => onDescriptionChange(e)}></input>
  </div>
);

Card.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
};

export default Card;
