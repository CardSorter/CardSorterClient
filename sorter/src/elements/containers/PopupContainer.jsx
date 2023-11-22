import {connect} from 'react-redux';

import Popup from '../components/Popup.jsx';
import * as uiAction from '../../actions/uiAction';

const mapStateToProps = (state) => {
  return ({
    title: state.ui.popup.title,
    content: state.ui.popup.content,
    prevContent: state.ui.popup.prevContent,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    onsubmit: (ref) => {
      const content = ref.current.value;
      dispatch(uiAction.popupChangeContent(content));
      dispatch(uiAction.togglePopup(false));
    },
    onCancel: (prevContent) => {
      // Reset the comment
      dispatch(uiAction.popupChangeContent(prevContent));
      dispatch(uiAction.togglePopup(false));
    },
  });
};

const PopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Popup);

export default PopupContainer;
