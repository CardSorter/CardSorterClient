// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';
import successImage from '../../../assets/icons/success.svg';

const SuccessPage = ({values, dispatch}) => {
  const urlRef = useRef(null);

  return (
    <div className="success-page">
      <h1>{L.text.studyCreated}</h1>
      <img src={successImage} alt="Welcome to your new study!"/>
      <div className="actions-container">
        <div className="button-container">
          <button onClick={dispatch.onButtonClick} className='btn-contained'>Go to study</button>
        </div>
        <div className="share-container">
          <div className="url-container">
            <textarea className="url" ref={urlRef}
              defaultValue={values.share_url}/>
            <button className="copy" type="button" onClick={() =>
              dispatch.onCopy(urlRef)}/>
          </div>
          <p>Share this url with the participants</p>
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
