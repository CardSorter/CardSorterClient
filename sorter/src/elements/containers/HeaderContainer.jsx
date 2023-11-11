import { connect } from 'react-redux';

import Header from '../components/Header.jsx';
import { sendSort, endSort, togglePopup, showingError, toggleConfirmPopUp, toggleToast, toggleDescriptionPopup } from '../../actions/uiAction';
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
      let noCategoryCreated = false;
      let hasSameCategory = false;
      let sameCategory = [];
      const seenTitles = [];

      if (Object.keys(categories).length === 0)
        noCategoryCreated = true;

      for (const key in categories) {
        if (categories.hasOwnProperty(key)) {


          if (!categories[key].title) {
            hasCategoryWithoutTitle = true;
          } else {
            const title = categories[key].title.toLowerCase();
            if (seenTitles[title]) {
              hasSameCategory = true;
              if (!sameCategory.includes(title))
                sameCategory.push(title);
            } else {
              seenTitles[title] = true;
            }
          }
        }
      }

      if (hasCategoryWithoutTitle || hasSameCategory) {
        dispatch(showingError(hasCategoryWithoutTitle, hasSameCategory, sameCategory))
      }
      else {
        if (noCategoryCreated)
          dispatch(toggleToast(true));
        else
          dispatch(toggleConfirmPopUp(true, !!container.length));
      }
    },
    onCommentClick: () => {
      dispatch(togglePopup(true, L.text.addComment));
    },
    onDescriptionClick: () => {
      dispatch(toggleDescriptionPopup(true));
    }
  };
};

const PopulateHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default PopulateHeader;
