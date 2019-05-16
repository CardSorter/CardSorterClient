import {connect} from 'react-redux';

import Header from '../components/Header.jsx';
import {sendSort, endSort, togglePopup} from '../../actions/uiAction';
import L from '../../localization/LocalizedText';


const mapStateToProps = (state) => {
  // The state is updated so the component knows what to send on finish
  // TODO: This may not be a very good solution
  return {
    studyID: state.ui.studyID,
    timeStarted: state.ui.timeStarted,
    container: state.container,
    categories: state.categories,
    comment: state.ui.popup.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFinishClick: (studyID, container, categories,
        timeStarted, comment) => {
      dispatch(endSort());
      dispatch(sendSort(studyID, container, categories,
          timeStarted, Date.now(), comment));
    },
    onCommentClick: () => {
      dispatch(togglePopup(true, L.text.addComment));
    },
  };
};

const PopulateHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default PopulateHeader;
