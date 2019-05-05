import {connect} from 'react-redux';

import Header from '../components/Header.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.header.username,
    profilePic: state.header.profilePic,
    showBackButton: ownProps.showBackButton,
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
