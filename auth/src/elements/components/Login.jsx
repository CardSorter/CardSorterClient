import React from 'react';
import PropTypes from 'prop-types';

import L from '../../localization/LocalizedText';

const Login = ({}) => (
  <div className="container">
    <p>{L.text.hiAgain}</p>
    <form>
      <input type="text" className="username" 
        placeholder={L.text.username}/>
      <input type="password" className="password"
        placeholder={L.text.password}/>
      <button type="button" className="reset">{L.text.forgotYourPassword}</button>
      <button type="button" className="action login">{L.text.login}</button>
    </form>
    <button className="register">{L.text.register}</button>
  </div>
);

Login.propTypes = {

};

export default Login;