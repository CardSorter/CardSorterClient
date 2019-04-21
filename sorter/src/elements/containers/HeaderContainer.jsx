import {connect} from 'react-redux';

import Header from '../components/Header.jsx';
import {sendSort} from '../../actions/uiAction';


const mapStateToProps = (state) => {
  // The state is updated so the component knows what to send on finish
  // TODO: This may not be a very good solution
  return {
    studyID: state.ui.studyID,
    container: state.container,
    categories: state.categories,
    renderThanks: state.ui.renderThanks,
    thanksMessage: state.ui.thanksMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFinishClick: (studyID, container, categories) => {
      dispatch(sendSort(studyID, container, categories));
    },
  };
};

const PopulateHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default PopulateHeader;
