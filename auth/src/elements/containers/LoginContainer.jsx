import {connect} from 'react-redux';

import Login from '../components/Login.jsx';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUsernameChange: (e) => {
      const username = e.target.value;
    },
    onPasswordChange: (e) => {
      const password = e.target.value;
    },
    onForgot: () => {

    },
    onLogin: () => {

    },
    onRegister: () => {
      ownProps.history.push('./register');
    },
  };
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default LoginContainer;
