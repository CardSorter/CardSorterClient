import React from 'react';
import PropTypes from 'prop-types';

import {createStudy, basicInformation, title, description, of}
  from '../../../localization/text';

const Page1 = ({defaultProps}) => (
  <div className='study-creation-card'>
    <h1>{createStudy()}</h1>
    <h2>{basicInformation()}</h2>

    <form>
      <input type='text' placeholder={title()} onChange={(e)=>
        defaultProps().onChange('title', e)}></input>
      <textarea placeholder={description()} rows='10' cols='30' onChange={(e)=>
        defaultProps().onChange('title', e)}></textarea>
      <input type='text' placeholder={title()} onChange={(e)=>
        defaultProps().onChange('title', e)}></input>
    </form>
    <div className="bottom-container">
      <div className="btn-container">
        <button className="prev disabled"
          onClick={defaultProps().onNext}></button>
        <button className="next" onClick={defaultProps().onPrev}></button>
      </div>
      <div className="page-no-container">
        <p>1</p>
        <p>{of()}</p>
        <p>3</p>
      </div>
    </div>
  </div>
);

Page1.propTypes = {
  defaultProps: PropTypes.func.isRequired,
};

export default Page1;
