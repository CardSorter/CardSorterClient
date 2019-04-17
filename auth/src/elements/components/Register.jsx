// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import L from '../../localization/LocalizedText';

const Register = ({onUsernameChange, onPasswordChange, onEmailChange,
  onSignUp, onBack}) => (
  <div className="container">
    <p>{L.text.hiThere}</p>
    <button className="back" onClick={onBack}></button>
    <form>
      <input type="text" className="username" onChange={onUsernameChange}
        placeholder={L.text.username}/>
      <input type="password" className="password" onChange={onPasswordChange}
        placeholder={L.text.password}/>
      <input type="email" className="email" onChange={onEmailChange}
        placeholder={L.text.email}/>
      <button type="button" className="action signup" onClick={onSignUp}>
        {L.text.signUp}</button>
    </form>
  </div>
);

Register.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Register;
