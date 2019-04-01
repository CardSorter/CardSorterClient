import * as cardActions from '../actions/cardAction';

import cards from '../staticContent/cards';

/**
 *
 * @param {boardState} state
 * @param {cardActions} action
 * @return {boardState}
 */
export default function card(state={}, action) {
  switch (action.type) {
    case cardActions.REQUEST_CARDS: {
      const response = action.payload.response;
      if (response) {
        for (const card of response.cards) {
          cards.push(card);
        }
      }
      return Object.assign({}, state, {
        'status': action.payload.status,
      });
    }
    default:
      return state;
  }
}
