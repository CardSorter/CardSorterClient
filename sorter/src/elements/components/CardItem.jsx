// eslint-disable-next-line no-unused-vars
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
 * @return {*}
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}


const CardItem = ({id, title, description, minimized, position,
  onClick, showDescription, connectDragSource, isDragging}) => {
  const classString = (!minimized || showDescription) ?
    'card' : 'card minimized';
  return connectDragSource(
      <li className={classString}>
        <h4>{title}</h4>
        {
          /* Show the description */
          (!minimized || showDescription) && <p>{description}</p>
        }
        {
          /* Show the description button */
          (minimized && description && !showDescription) &&
            <div className="desc-container">
              <button onClick={onClick} className="desc-btn">
                <p>?</p>
              </button>
            </div>
        }
        {
          /* The "drag to add" action */
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


// eslint-disable-next-line new-cap
export default DragSource(itemTypes.CARD, cardSource, collect)(CardItem);
