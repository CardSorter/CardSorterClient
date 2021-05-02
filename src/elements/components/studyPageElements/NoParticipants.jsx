// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';
import noParticipantsImage from '../../../assets/icons/empty.svg';

const NoParticipants = ({shareUrl, copyUrl}) => {
  const urlRef = useRef(null);
  return (
    <div className="no-participants-page">
      <h1>{L.text.noParticipantsYet}</h1>
      <img src={noParticipantsImage} alt="Nothing found"></img>
      <div className="actions-container">
        <div className="url-container">
          <textarea className="url" ref={urlRef}
            defaultValue={shareUrl}></textarea>
          <button className="copy" type="button" onClick={() =>
            copyUrl(urlRef)}></button>
        </div>
      </div>
    </div>);
};

NoParticipants.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  copyUrl: PropTypes.func.isRequired,
};

export default NoParticipants;
