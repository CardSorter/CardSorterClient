// eslint-disable-next-line no-unused-vars
import React from 'react';

import L from '../../../localization/LocalizedText';
import noParticipantsImage from '../../../icons/empty.svg';

const NoParticipants = () => (
  <div className="no-participants-page">
    <h1>{L.text.noParticipantsYet}</h1>
    <img src={noParticipantsImage} alt="Nothing found"></img>
  </div>
);

export default NoParticipants;
