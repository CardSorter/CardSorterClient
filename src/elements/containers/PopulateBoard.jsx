import React from 'react';
import {connect} from 'react-redux';
import Board from '../components/Board.jsx';
import * as uiAction from '../../actions/uiAction';

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
    onCardClick: (event, cardID) => {
      event.stopPropagation();
      dispatch(uiAction.showDescription(cardID));
    },
  };
};

const PopulateBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);

export default PopulateBoard;
