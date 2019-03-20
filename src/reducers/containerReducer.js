import * as cardActions from '../actions/cardAction';

/**
 *
 * @param {boardState} state
 * @param {ReduxAction} action
 * @return {boardState}
 */
export default function container(state={}, action) {
  switch (action.type) {
    case cardActions.ADD_CARD_CONTAINER: {
      return [
        ...state,
        action.payload.cardID,
      ];
    }
    case cardActions.REMOVE_CARD_CONTAINER: {
      return [...state].filter((x) => x !== action.payload.cardID);
    }
    default:
      return state;
  }
}
