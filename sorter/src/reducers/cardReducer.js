import * as cardAction from '../actions/cardAction';
import Card from '../elements/Card';
import cards from '../staticContent/cards';

/**
 *
 * @param {boardState} state
 * @param {cardActions} action
 * @return {boardState}
 */
export default function card(state={}, action) {
  switch (action.type) {
    case cardAction.REQUEST_CARDS: {
      const response = action.payload.response;
      if (response) {
        for (const card of response.cards) {
          cards[card.id] =
              new Card(card.id, card.name, card.description);
        }
      }
      return Object.assign({}, state, {
        'status': action.payload.status,
        'notFound': action.payload.error ? true : false,
      });
    }
    case cardAction.TOGGLE_DESCRIPTION: {
      const newState = Object.assign({}, state);
      newState.showingDescription = [...newState.showingDescription];

      if (newState.showingDescription.indexOf(action.payload.cardID) === -1) {
        // Show the description if the description is not showing
        newState.showingDescription.push(action.payload.cardID);
      } else {
        // Hide the description
        newState.showingDescription =
          newState.showingDescription.filter((item) =>
            item !== action.payload.cardID);
      }

      return newState;
    }
    default:
      return state;
  }
}
