import React from 'react';
import {connect} from 'react-redux';

import Board from '../components/Board.jsx';
import * as uiAction from '../../actions/uiAction';
import * as cardAction from '../../actions/cardAction';

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

const mapStateToProps = (state) => {
  // Convert to array
  const categories = Object.values(state.categories);
  const showingDescription = state.ui['showingDescription'];
  return {categories: categories, descriptionID: showingDescription};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      // Hide the descriptions on user click
      dispatch(uiAction.hideAllDescriptions());
    },
    onDrop: (cardID, cardPosition) => {
      // Create the new category, containing the dropped card
      removeCardFromParent(dispatch, cardPosition, cardID);
      dispatch(cardAction.createCategory(undefined,
          text.categoryTitle(), cardID));
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
