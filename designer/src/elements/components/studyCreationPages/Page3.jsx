import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../../localization/LocalizedText';

const Page3 = ({values, dispatch}) => (
  <div className="study-creation-card">
    <h1>{localizedText.text.createStudy}</h1>
    <h2>{localizedText.text.message}</h2>

    <form>
      <textarea className="thanks message" cols="30" rows="10"
        onChange={(e) => dispatch.onMessageChange(e)}
        placeholder={values.message || localizedText.text.thanksMessage}>
      </textarea>
      <div className="url-container">
        <p className="url">{values.url}</p>
        <button className="copy" type="button"></button>
      </div>
    </form>

    <div className="bottom-container">
      <div className="btn-container">
        <button className="prev"
          onClick={dispatch.onPrev}></button>
        <button className="create" onClick={() =>
          dispatch.onNext(values.study)}>
          {localizedText.text.create}</button>
      </div>
      <div className="page-no-container">
        <p>3</p>
        <p>{localizedText.text.of}</p>
        <p>3</p>
      </div>
    </div>
  </div>
);

Page3.propTypes = {
  values: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default Page3;
