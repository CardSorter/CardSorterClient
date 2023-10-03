import { connect } from 'react-redux';

import Board from '../components/Board.jsx';
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
  // alert(JSON.stringify(categories))
  return { categories: categories };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      // Hide the category renaming on user click
      dispatch(uiAction.hideAllTitleBoxes());
    },
    onDrop: (cardID, cardPosition) => {
      // This is *only* executed only if the OnCardDrop didn't
      // Create the new category, containing the dropped card
      removeCardFromParent(dispatch, cardPosition, cardID);
      dispatch(categoryAction.createCategory(undefined, cardID));
    },
    removeEmptyCategories: (categories) => {
      // This is triggered on every drop on the Board
      deleteEmptyCategories(dispatch, categories);
    },
  };
};

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

export default BoardContainer;
