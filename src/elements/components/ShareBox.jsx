// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react';
import PropTypes from 'prop-types';

const ShareBox = ({url, text, onCopy}) => {
  const urlRef = useRef(null);

  return (
    <div className="share-container">
      <div className="url-container">
        <textarea className="url" ref={urlRef}
          defaultValue={url}></textarea>
        <button className="copy" type="button" onClick={() =>
          onCopy(urlRef)}></button>
      </div>
      {
        text &&
        <p>{text}</p>
      }
    </div>
  );
};

ShareBox.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
};

export default ShareBox;
