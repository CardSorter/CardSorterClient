// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import L from '../../localization/LocalizedText';

const Register = ({onUsernameChange, onPasswordChange, onEmailChange,
  onSignUp, onBack, username, password, email, usernameError,
  passwordError, emailError, onErrorShow, onFormKeyPress}) => {
  if (usernameError) {
    onErrorShow.usernameErrorShowing();
  }
  if (passwordError) {
    onErrorShow.passwordErrorShowing();
  }
  if (emailError) {
    onErrorShow.emailErrorShowing();
  }
  return (
    <div className="container">
      <p>{L.text.hiThere}</p>
      <button className="back" onClick={onBack}></button>
      <form onKeyPress={(e) => onFormKeyPress(e, username, password, email)}>
        <div className="error-holder">
          <input type="text" className="username" onChange={onUsernameChange}
            placeholder={L.text.username}/>
          {
            usernameError &&
            <div className="error-message"><p>{usernameError}</p></div>
          }
        </div>
        <div className="error-holder">
          <input type="password" className="password"
            onChange={onPasswordChange} placeholder={L.text.password}/>
          {
            passwordError &&
            <div className="error-message"><p>{passwordError}</p></div>
          }
        </div>
        
        <div className="error-holder">
          <input type="email" className="email last" onChange={onEmailChange}
            placeholder={L.text.email}/>
          {
            emailError &&
            <div className="error-message"><p>{emailError}</p></div>
          }
        </div>
        <button type="button" className="action signup"
          onClick={() => onSignUp(username, password, email)}>
          <p>{L.text.signUp}</p></button>
      </form>
    </div>
  );
};

Register.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  usernameError: PropTypes.string,
  emailError: PropTypes.string,
  onErrorShow: PropTypes.object.isRequired,
};

export default Register;
