// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';
import successImage from '../../../icons/success.svg';

const SuccessPage = ({ values, dispatch }) => {
  const urlRef = useRef(null);
  return (
    <div className="success-page">
      <h1>{L.text.studyCreated}</h1>
      <img src={successImage} alt="Welcome to your new study!"></img>
      <div className="actions-container">
        <div className="button-container">
          <button onClick={dispatch.onButtonClick}>Go to study</button>
        </div>
        <div className="share-container">
          <div className="url-container">
            <a className="url" ref={urlRef} href={values.share_url} target="_blank">{values.share_url}</a>
            <button className="copy" type="button" onClick={() =>
              dispatch.onCopy(urlRef)}></button>
          </div>
          <p>{L.text.shareThisUrlWithTheParticipants}</p>
        </div>
      </div>
    </div>
  );
};

SuccessPage.propTypes = {
  values: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default SuccessPage;
