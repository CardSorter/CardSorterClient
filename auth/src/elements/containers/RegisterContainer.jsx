import {connect} from 'react-redux';

import * as registerActions from '../../actions/registerAction';
import Register from '../components/Register.jsx';

const mapStateToProps = (state) => {
  return {};
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
    onSignUp: () => {

    },
    onBack: () => {
      dispatch(registerActions.clearCredentials());
      ownProps.history.push('/');
    },
  };
};

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);

export default RegisterContainer;
