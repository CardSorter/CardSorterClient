// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const ShareBox = ({ url, text, onCopy }) => {
  const urlRef = useRef(null);

  return (
    <div className="share-container">
      <div className="url-container">
        <a className="url" ref={urlRef}
          href={url} target="_blank" > {url}</a>
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
