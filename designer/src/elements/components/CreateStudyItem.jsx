// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import plusSign from '../../assets/icons/plus.svg';

const CreateStudyItem = ({onClick}) => (
  <button className="createStudyCard" onClick={onClick}>
    <img src={plusSign} alt='Plus sign'/>
    <p>Create a study</p>
  </button>
);

CreateStudyItem.propTypes = {
  onClick: PropTypes.func,
};

export default CreateStudyItem;
