import {connect} from 'react-redux';

import * as loginActions from '../../actions/loginAction';
import Login from '../components/Login.jsx';

const mapStateToProps = (state) => {
  return {};
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
    onLogin: () => {

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
