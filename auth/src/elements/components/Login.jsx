// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import L from '../../localization/LocalizedText';

const Login = ({onUsernameChange, onPasswordChange, onForgot,
  onLogin, onRegister, username, password, usernameError, passwordError,
  onErrorShow, onFormKeyPress}) => {
  if (usernameError) {
    onErrorShow.usernameErrorShowing();
  }
  if (passwordError) {
    onErrorShow.passwordErrorShowing();
  }
  return (
    <div className="container">
      <p>{L.text.hiAgain}</p>
      <form onKeyPress={(e) => onFormKeyPress(e, username, password)}>
        <div className="error-holder">
          <input type="text" className="username" onChange={onUsernameChange}
            placeholder={L.text.username}/>
          {
            usernameError &&
            <div className="error-message"><p>{usernameError}</p></div>
          }
        </div>

        <div className="error-holder">
          <input type="password" className="password last"
            onChange={onPasswordChange} placeholder={L.text.password}/>
          {
            passwordError &&
            <div className="error-message"><p>{passwordError}</p></div>
          }
        </div>

        <button type="button" className="reset unavailable"
          onClick={onForgot}>{L.text.forgotYourPassword}</button>

        <button type="button" className="action login"
          onClick={() => onLogin(username, password)}>
          <p>{L.text.login}</p>
        </button>
      </form>

      <button className="register unavailable">{L.text.register}</button>
    </div>
  );
};

Login.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onForgot: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  usernameError: PropTypes.string,
  passwordError: PropTypes.string,
  onErrorShow: PropTypes.object.isRequired,
};

export default Login;
