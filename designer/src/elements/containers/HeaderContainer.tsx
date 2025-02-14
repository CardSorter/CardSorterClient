"use client"

import {connect} from 'react-redux';

import * as headerActions from '../../actions/headerAction';
import Header from '../components/Header';

// TODO: Better typing
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    username: state.header.username,
    profilePic: state.header.profilePic,
    profileUnfold: state.header.profileUnfold,
    showBackButton: ownProps.showBackButton,
  };
};

// TODO: Better typing
const mapDispatchToProps = (dispatch: any) => {
  return {
    onProfileClick: (isUnfold: boolean) => {
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
