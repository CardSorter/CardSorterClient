import {connect} from 'react-redux';

import Board from '../components/Board.jsx';
import * as uiAction from '../../actions/uiAction';
import * as cardAction from '../../actions/cardAction';
import * as categoryAction from '../../actions/categoryAction';

import * as text from '../../localization/text';

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

/**
 * Looks for an empty category and removes it from the state
 * @param {function} dispatch
 * @param {Category[]} categories
 */
function deleteEmptyCategories(dispatch, categories) {
  for (const i in categories) {
    if (categories[i].cards.length < 1) {
      // Only one category can be empty on each state update
      dispatch(categoryAction.removeCategory(categories[i].id));
      break;
    }
  }
}

const mapStateToProps = (state) => {
  // Convert to array
  const categories = Object.values(state.categories);
  const showingDescription = state.ui['showingDescription'];
  const changeTitle = state.ui['changeTitle'];

  return {categories: categories, descriptionID: showingDescription,
    changeTitleID: changeTitle};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      // Hide the descriptions and category renaming on user click
      dispatch(uiAction.hideAllDescriptions());
      dispatch(uiAction.hideAllTitleBoxes());
    },
    onDrop: (cardID, cardPosition) => {
      // This is *only* executed only if the OnCardDrop didn't
      // Create the new category, containing the dropped card
      removeCardFromParent(dispatch, cardPosition, cardID);
      dispatch(categoryAction.createCategory(undefined,
          text.categoryTitle(), cardID));
    },
    removeEmptyCategories: (categories) => {
      // This is triggered on every drop on the Board
      deleteEmptyCategories(dispatch, categories);
    },
    onCategTitleClick: (event, categoryID) => {
      event.stopPropagation();
      dispatch(uiAction.showTitleBoxOnCategory(categoryID));
    },
    onCategTitleChange: (event, categoryID) => {
      let title = event.target.value;
      title = title.replace(/\s\s+/g, ' ').trim();
      title = (title.length > 0) ? title : text.categoryTitle();
      dispatch(categoryAction.renameCategory(categoryID, title));
    },
    onCategTitleFinish: (event) => {
      event.stopPropagation();
      if (event.charCode === 13) {
        dispatch(uiAction.hideAllTitleBoxes());
      }
    },
    onCardClick: (event, cardID) => {
      event.stopPropagation();
      dispatch(uiAction.showDescription(cardID));
    },
    onCardDrop: (cardID, cardPosition, categoryID) => {
      removeCardFromParent(dispatch, cardPosition, cardID);
      dispatch(cardAction.addCardToCategory(cardID, categoryID));
    },
  };
};

const PopulateBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);

export default PopulateBoard;
