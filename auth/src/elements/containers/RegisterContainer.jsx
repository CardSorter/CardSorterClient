import {connect} from 'react-redux';

import Register from '../components/Register.jsx'; 

const mapStateToProps = (state) => {
  return {
    
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterContainer;
