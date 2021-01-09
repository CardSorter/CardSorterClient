import {connect} from 'react-redux';

import * as headerActions from '../../actions/headerAction';
import Header from '../components/Header';

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.header.username,
    profilePic: state.header.profilePic,
    profileUnfold: state.header.profileUnfold,
    showBackButton: ownProps.showBackButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileClick: (isUnfold) => {
      dispatch(headerActions.toggleProfileSettings(!isUnfold));
    },
    onLogoutClick: () => {
      dispatch(headerActions.logout());
    },
  };
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default HeaderContainer;
