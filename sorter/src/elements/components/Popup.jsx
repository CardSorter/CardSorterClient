// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import L from '../../localization/LocalizedText';

const Popup = ({title, content, onSumbit, onCancel}) => {
  const textareaRef = useRef(null);
  return (
    <div className="popup-container">
      <div className="popup">
        <h1>{title}</h1>
        <form>
          <textarea defaultValue={content} ref={textareaRef}>
          </textarea>
          <div className="btn-container">
            <button type="button" className="btn--secondary cancel"
              onClick={() => onCancel(content)}>
              <p>{L.text.cancel}</p>
            </button>
            <button type="button" className="btn--main sumbit"
              onClick={() => onSumbit(textareaRef)}>
              <p>{L.text.sumbit}</p>
            </button>
          </div>
        </form>
      </div>
    </div>);
};

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onSumbit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Popup;
