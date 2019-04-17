import {connect} from 'react-redux';

import Register from '../components/Register.jsx';

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
    onEmailChange: (e) => {
      const email = e.target.value;
    },
    onSignUp: () => {

    },
    onBack: () => {
      ownProps.history.push('/');
    },
  };
};

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);

export default RegisterContainer;
