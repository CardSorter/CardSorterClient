// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import L from '../../localization/LocalizedText';

const Login = ({onUsernameChange, onPasswordChange, onForgot,
  onLogin, onRegister}) => (
  <div className="container">
    <p>{L.text.hiAgain}</p>
    <form>
      <input type="text" className="username" onChange={onUsernameChange}
        placeholder={L.text.username}/>

      <input type="password" className="password" onChange={onPasswordChange}
        placeholder={L.text.password}/>

      <button type="button" className="reset"
        onClick={onForgot}>{L.text.forgotYourPassword}</button>

      <button type="button" className="action login"
        onClick={onLogin}>{L.text.login}</button>
    </form>

    <button className="register"
      onClick={onRegister}>{L.text.register}</button>
  </div>
);

Login.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onForgot: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default Login;
