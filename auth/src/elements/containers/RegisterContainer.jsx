import {connect} from 'react-redux';

import * as registerActions from '../../actions/registerAction';
import Register from '../components/Register.jsx';

const mapStateToProps = (state) => {
  return {
    username: state.register.username,
    password: state.register.password,
    email: state.register.email,
    usernameError: state.register.usernameError,
    emailError: state.register.emailError,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUsernameChange: (e) => {
      const username = e.target.value;
      dispatch(registerActions.changeUsername(username));
    },
    onPasswordChange: (e) => {
      const password = e.target.value;
      dispatch(registerActions.changePassword(password));
    },
    onEmailChange: (e) => {
      const email = e.target.value;
      dispatch(registerActions.changeEmail(email));
    },
    onSignUp: (username, password, email) => {
      dispatch(registerActions.clearUsernameError());
      dispatch(registerActions.clearEmailError());
      dispatch(registerActions.sendCredentials(username, password, email));
    },
    onBack: () => {
      dispatch(registerActions.clearCredentials());
      ownProps.history.push('/');
    },
    onErrorShow: {
      // Clear the errors after some time
      usernameErrorShowing: () => {
        setTimeout(() => dispatch(registerActions.clearUsernameError()),
            5000);
      },
      emailErrorShowing: () => {
        setTimeout(() => dispatch(registerActions.clearEmailError()),
            5000);
      },
    },
  };
};

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);

export default RegisterContainer;
