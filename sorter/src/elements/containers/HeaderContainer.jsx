import {connect} from 'react-redux';

import Header from '../components/Header.jsx';
import {sendSort, endSort} from '../../actions/uiAction';


const mapStateToProps = (state) => {
  // The state is updated so the component knows what to send on finish
  // TODO: This may not be a very good solution
  return {
    studyID: state.ui.studyID,
    timeStarted: state.ui.timeStarted,
    container: state.container,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFinishClick: (studyID, container, categories,
        timeStarted) => {
      dispatch(endSort());
      dispatch(sendSort(studyID, container, categories,
          timeStarted, Date.now()));
    },
  };
};

const PopulateHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default PopulateHeader;
