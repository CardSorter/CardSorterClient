import {connect} from 'react-redux';
import Container from '../components/Container.jsx';
import cards from '../../staticContent/cards';


const mapStateToProps = (state) => {
  // Add the card item based on it's id
  const cardsArr = [];
  for (const cardID of state.container) {
    cardsArr.push(cards[cardID]);
  }
  return {
    cards: cardsArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const PopulateContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Container);

export default PopulateContainer;
