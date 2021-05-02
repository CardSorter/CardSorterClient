// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';

const Page3 = ({values, errors, dispatch}) => (
  <div className="study-creation-card">
    <h1>{L.text.createStudy}</h1>
    <h2>{L.text.message}</h2>

    <form>
      <div className="error-holder">
        <textarea className="thanks message" cols="30" rows="10"
          onChange={(e) => dispatch.onMessageChange(e)}
          placeholder={L.text.thanksMessage}
          defaultValue={values.message}>
        </textarea>
        {
          errors.message &&
          <div className="error-message"><p>{L.text.fillMeOut}</p></div>
        }
      </div>
    </form>

    <div className="bottom-container">
      <div className="btn-container">
        <button className="btn-text"
          onClick={dispatch.onPrev}>Back</button>
        <button className="btn-contained ml-sm" onClick={() =>
          dispatch.onNext(values.study)}>
          {L.text.create}</button>
      </div>
      <div className="page-no-container">
        <p>3</p>
        <p>{L.text.of}</p>
        <p>3</p>
      </div>
    </div>
  </div>
);

Page3.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default Page3;
