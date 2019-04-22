import {connect} from 'react-redux';

import OnBoarding from '../components/OnBoarding';
import {toogleOnBoarding} from '../../actions/uiAction';

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
    },
  };
};

const OnBoardingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OnBoarding);

export default OnBoardingContainer;
