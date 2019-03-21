import React from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';

import {itemTypes} from '../../staticContent/dragConstants';


const cardSource = {
  beginDrag(props) {
    return {id: props.id, position: props.position};
  },
};

/**
 * 
 * @param {*} connect 
 * @param {*} monitor 
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}


const CardItem = ({id, title, description, minimized, position,
  onClick, showDescription, connectDragSource, isDragging}) => {
  const classString = minimized ? 'card minimized' : 'card';
  return connectDragSource(
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
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  minimized: PropTypes.bool,
  position: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  showDescription: PropTypes.bool,
};


export default DragSource(itemTypes.CARD, cardSource, collect)(CardItem);
