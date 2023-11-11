import { connect } from 'react-redux';

import Category from '../components/Category';
import L from '../../localization/LocalizedText';

import * as uiAction from '../../actions/uiAction';
import * as cardAction from '../../actions/cardAction';
import * as categoryAction from '../../actions/categoryAction';

/**
 * Removes the card with the given id from it's current parent
 * @param {function} dispatch
 * @param {Number} cardPosition
 * @param {Number} cardID
 */
function removeCardFromParent(dispatch, cardPosition, cardID) {
  if (cardPosition === -1) {
    // The card is in the main container
    dispatch(cardAction.removeCardFromContainer(cardID));
  } else
    if (cardPosition > -1) {
      // The card belongs to a category and it is being moved to a
      // new one
      dispatch(cardAction.removeCardFromCategory(cardID, cardPosition));
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    title: ownProps.title,
    cards: ownProps.cards,
    isMinimized: state.categories[ownProps.id].isMinimized,
    descriptionIDs: state.cards['showingDescription'],
    showTitleBox: ownProps.id === state.ui['changeTitle'],
    errorsTitle: state.ui.errors.title,
    errorsSameCategory: state.ui.errors.sameCategory,
    sameCategory: state.ui.errors.sameCategoryList,
    showConfirmPopUp: state.ui.confirmPopup.show,
    unSortedConfirmPopUp: state.ui.confirmPopup.unSorted,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTitleClick: (event, categoryID) => {
      event.stopPropagation();
      dispatch(uiAction.showTitleBoxOnCategory(categoryID));
    },
    onTitleChange: (event, categoryID) => {
      let title = event.target.value;
      title = title.replace(/\s\s+/g, ' ').trim();
      title = (title.length > 0) ? title : L.text.clickToRename;
      dispatch(categoryAction.renameCategory(categoryID, title));
    },
    onTitleFinish: (event) => {
      if (!event) {
        dispatch(uiAction.hideAllTitleBoxes());
        return;
      }
      event.stopPropagation();
      if (event.charCode === 13) {
        dispatch(uiAction.hideAllTitleBoxes());
      }
    },
    onCardClick: (event, cardID, description) => {
      event.stopPropagation();
      if (description && description.length > 0) {
        dispatch(cardAction.toggleDescription(cardID));
      }
    },
    onMinimized: (event, isMinimized, categoryID) => {
      event.stopPropagation();
      dispatch(categoryAction.minimizeCategory(categoryID, !isMinimized));
    },
    onCardDrop: (cardID, cardPosition, categoryID) => {
      removeCardFromParent(dispatch, cardPosition, cardID);
      dispatch(cardAction.addCardToCategory(cardID, categoryID));
    },
    hidingErrorTitle: () => {
      dispatch(uiAction.hidingError());
    }

  };
};

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);

export default CategoryContainer;
