import {connect} from 'react-redux';

import Header from '../components/Header.jsx';

const mapStateToProps = (state) => {
  return {
    username: state.header.username,
    profilePic: state.header.profilePic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default HeaderContainer;
