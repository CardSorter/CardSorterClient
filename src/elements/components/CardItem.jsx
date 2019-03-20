import React from 'react';
import PropTypes from 'prop-types';


const CardItem = ({title, description, minimized,
  onClick, showDescription}) => {
  const classString = minimized ? 'card minimized' : 'card';
  return (
    <li className={classString}>
      <h4>{title}</h4>
      {
        /* Hide the description */
        !minimized && <p>{description}</p>
      }
      {
        /* Show the description button */
        minimized &&
          <div className="desc-container">
            <button onClick={onClick} className="desc-btn">
              ?
            </button>
            {
              showDescription &&
              <div className="desc-pop">
                <p>
                  {description}
                </p>
              </div>
            }
          </div>
      }
    </li>);
};

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  minimized: PropTypes.bool,
  onClick: PropTypes.func,
  showDescription: PropTypes.bool,
};

export default CardItem;
