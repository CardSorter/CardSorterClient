import {connect} from 'react-redux';

import * as loginActions from '../../actions/loginAction';
import Login from '../components/Login.jsx';

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password,
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
      dispatch(loginActions.sendCredentials(username, password));
    },
    onRegister: () => {
      dispatch(loginActions.clearCredentials());
      ownProps.history.push('./register');
    },
  };
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default LoginContainer;
