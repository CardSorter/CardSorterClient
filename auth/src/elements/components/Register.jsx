import React from 'react';
import PropTypes from 'prop-types';

import L from '../../localization/LocalizedText';

const Register = ({}) => (
  <div className="container">
    <p>{L.text.hiThere}</p>
    <button className="back"></button>
    <form>
      <input type="text" className="username" 
        placeholder={L.text.username}/>
      <input type="password" className="password"
        placeholder={L.text.password}/>
      <input type="email" className="email"
        placeholder={L.text.email}/>
      <button type="button" className="action signup">{L.text.signUp}</button>
    </form>
  </div>
);

Register.propTypes = {

};

export default Register;