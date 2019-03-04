import React from 'react';
import PropTypes from 'prop-types';

const CardItem = ({title, description}) => (
  <li className='card'>
    <h4>{title}</h4>
    <p>{description}</p>
  </li>
);

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default CardItem;
