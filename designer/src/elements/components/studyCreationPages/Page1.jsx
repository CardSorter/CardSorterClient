import React from 'react';
import PropTypes from 'prop-types';

import localizedText from '../../../localization/LocalizedText';

const Page1 = ({values, dispatch}) => (
  <div className='study-creation-card'>
    <h1>{localizedText.text.createStudy}</h1>
    <h2>{localizedText.text.basicInformation}</h2>

    <form>
      <input type='text' placeholder={values.title ||
        localizedText.text.title} onChange={(e)=>
        dispatch.onChange('title', e)}></input>

      <textarea placeholder={values.description ||
        localizedText.text.description} rows='10' cols='30' onChange={(e)=>
        dispatch.onChange('description', e)}></textarea>

      <div className="url-container">
        <p className="url-small">{values.url}</p>
        <input type='text' placeholder={values.title ||
          localizedText.text.title} onChange={(e)=>
          dispatch.onChange('url', e)}></input>
        <button className="copy" type="button"></button>
      </div>

    </form>
    <div className="bottom-container">
      <div className="btn-container">
        <button className="prev disabled"
          onClick={dispatch.onPrev}></button>
        <button className="next" onClick={dispatch.onNext}></button>
      </div>
      <div className="page-no-container">
        <p>1</p>
        <p>{localizedText.text.of}</p>
        <p>3</p>
      </div>
    </div>
  </div>
);

Page1.propTypes = {
  dispatch: PropTypes.object.isRequired,
};

export default Page1;
