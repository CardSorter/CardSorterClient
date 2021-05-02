// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';

const Page1 = ({values, errors, dispatch}) => (
  <div className='study-creation-card'>
    <h1>{L.text.createStudy}</h1>
    <h2>{L.text.basicInformation}</h2>

    <form>
      <div className="error-holder">
        <input type='text' placeholder={L.text.title}
          defaultValue={values.title} onChange={(e)=>
            dispatch.onChange('title', e)}/>
        {
          errors.title &&
          <div className="error-message"><p>{L.text.fillMeOut}</p></div>
        }
      </div>
      <div className="error-holder">
        <textarea placeholder = {L.text.description}
          defaultValue={values.description} rows='10' cols='30' onChange={(e)=>
            dispatch.onChange('description', e)}>
        </textarea>
        {
          errors.description &&
          <div className="error-message"><p>{L.text.fillMeOut}</p></div>
        }
      </div>
    </form>
    <div className="bottom-container">
      <div className="btn-container">
        <button className="prev disabled" onClick={dispatch.onPrev}/>
        <button className="btn-contained ml-sm" onClick={() => dispatch.onNext(values.title, values.description)}>
            next
        </button>
      </div>
      <div className="page-no-container">
        <p>1</p>
        <p>{L.text.of}</p>
        <p>3</p>
      </div>
    </div>
  </div>
);

Page1.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default Page1;
