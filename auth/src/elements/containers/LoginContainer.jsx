import {connect} from 'react-redux';

import * as loginActions from '../../actions/loginAction';
import Login from '../components/Login.jsx';

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password,
    usernameError: state.login.usernameError,
    passwordError: state.login.passwordError,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUsernameChange: (e) => {
      const username = e.target.value;
      dispatch(loginActions.changeUsername(username));
    },
    onPasswordChange: (e) => {
      const password = e.target.value;
      dispatch(loginActions.changePassword(password));
    },
    onForgot: () => {

    },
    onLogin: (username, password) => {
      dispatch(loginActions.clearUsernameError());
      dispatch(loginActions.clearPasswordError());
      dispatch(loginActions.sendCredentials(username, password));
    },
    onRegister: () => {
      dispatch(loginActions.clearCredentials());
      ownProps.history.push('./register');
    },
    onErrorShow: {
      // Clear the errors after some time
      usernameErrorShowing: () => {
        setTimeout(() => dispatch(loginActions.clearUsernameError()),
            5000);
      },
      passwordErrorShowing: () => {
        setTimeout(() => dispatch(loginActions.clearPasswordError()),
            5000);
      },
    },
    onFormKeyPress: (e, username, password) => {
      if (e.key === 'Enter') {
        dispatch(loginActions.clearUsernameError());
        dispatch(loginActions.clearPasswordError());
        dispatch(loginActions.sendCredentials(username, password));
      }
    },
  };
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default LoginContainer;
