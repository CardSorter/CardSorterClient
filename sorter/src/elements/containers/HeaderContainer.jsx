import { connect } from 'react-redux';

import Header from '../components/Header.jsx';
import { sendSort, endSort, togglePopup, showingError } from '../../actions/uiAction';
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

      let hasCategoryWithoutTitle = false;

      let hasSameCategory = false;
      const seenTitles = [];
      for (const key in categories) {
        if (categories.hasOwnProperty(key)) {
          const title = categories[key].title.toLowerCase();

          if (!title) {
            hasCategoryWithoutTitle = true;
          } else {
            if (seenTitles[title]) {
              hasSameCategory = true;
              break;
            } else {
              seenTitles[title] = true;
            }
          }
        }
      }

      if (hasCategoryWithoutTitle || hasSameCategory) {
        dispatch(showingError(hasCategoryWithoutTitle, hasSameCategory))
      }
      else {
        dispatch(endSort());
        dispatch(sendSort(studyID, container, categories,
          timeStarted, Date.now(), comment));
      }
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
