export const SHOW_DESCRICTION = 'SHOW_DESCRIPTION';
export const HIDE_ALL_DESCRIPTIONS = 'HIDE_ALL_DESCRIPTIONS';

/**
 * Shows the description of a specified card
 * @param {int} cardID the id of the card that the description will be thrown
 * @return {JSON} the action
 */
export function showDescription(cardID) {
  return {
    type: SHOW_DESCRICTION,
    payload: {
      cardID: cardID,
    },
    error: false,
  };
}

/**
 * Hides the pop up description, it makes sure that none is shown.
 * @return {JSON} the action
 */
export function hideAllDescriptions() {
  return {
    type: HIDE_ALL_DESCRIPTIONS,
    error: false,
  };
}
