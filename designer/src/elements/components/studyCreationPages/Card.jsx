// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../../localization/LocalizedText';

const Card = ({name, description,
  onNameChange, onDescriptionChange, onDelete}) => (
  <div className="card">
    <input type="text" placeholder={localizedText.text.cardName}
      defaultValue={name} onChange={(e) => onNameChange(e)}></input>
    <input type="text" placeholder={localizedText.text.description}
      defaultValue={description} onChange={(e) =>
        onDescriptionChange(e)}></input>
    <button type="button" onClick={onDelete}></button>
  </div>
);

Card.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
};

export default Card;
