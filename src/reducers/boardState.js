import Card from '../elements/Card';

const initialState = {
  cards: {

    },
  categories: [],
};

// Populate the initial state

initialState.cards = {
  6532: new Card(6532, 'Card1', 'lorem ipsum sit dolor asmet.')
}

export default initialState;
