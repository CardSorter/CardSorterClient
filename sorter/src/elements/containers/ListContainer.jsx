import { connect } from 'react-redux';
import List from '../components/List.jsx';
import parseCards from '../../helpers/cardParser';
import * as cardAction from '../../actions/cardAction';
import * as categoryAction from '../../actions/categoryAction';

function removeCardFromParent(dispatch, cardPosition, cardID) {
  if (cardPosition === -1) {
    // The card is still in the main container
  } else
    if (cardPosition > -1) {
      // The card belongs to a category and it is come back to the main container
      dispatch(cardAction.removeCardFromCategory(cardID, cardPosition));
    }
}

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
  const categories = Object.values(state.categories);
  const cards = parseCards(state.container);
  return {
    categories: categories,
    cards: cards,
  };

  // return {
  //   categories: categories,
  //   cards: cards,
  // };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDrop: (cardID, cardPosition, categories) => {
      dispatch(cardAction.addCardToContainer(cardID));
      removeCardFromParent(dispatch, cardPosition, cardID);
      deleteEmptyCategories(dispatch, categories);
    },


  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export default ListContainer;
