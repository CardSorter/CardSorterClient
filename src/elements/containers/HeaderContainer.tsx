import {connect} from 'react-redux';

import Header, {HeaderDispatch, HeaderProps, HeaderState} from '../components/Header';
import {Dispatch} from "redux";
import {logout} from "../../actions/headerAction";
import {CardSorterState} from "../../State";

const mapStateToProps = (state: CardSorterState, ownProps: HeaderProps): HeaderProps & HeaderState => {
  return {
    username: state.header.username,
    showBackButton: ownProps.showBackButton,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): HeaderDispatch => {
  return {
    onLogoutClick: () => {
      dispatch(logout());
    },
  };
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default HeaderContainer;
