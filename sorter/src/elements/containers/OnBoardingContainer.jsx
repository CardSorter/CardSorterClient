import { connect } from 'react-redux';

import OnBoarding from '../components/OnBoarding';
import { toogleOnBoarding, startSort } from '../../actions/uiAction';

const mapStateToProps = (state) => {
  return {
    show: state.ui.showOnBoarding,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (e) => {
      e.stopPropagation();
      dispatch(toogleOnBoarding(false));
      dispatch(startSort());
    },
  };
};

const OnBoardingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnBoarding);

export default OnBoardingContainer;
