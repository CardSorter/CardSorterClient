export const SHOW_DESCRICTION = 'SHOW_DESCRIPTION';
export const HIDE_ALL_DESCRIPTIONS = 'HIDE_ALL_DESCRIPTIONS';
export const SHOW_TITLE_BOX = 'SHOW_TITLE_BOX';
export const HIDE_ALL_BOXES = 'HIDE_ALL_BOXES';

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

/**
 * Shows the textbox of the category, so the user can change the title.
 * @param {Number} categoryID
 * @return {JSON} the action
 */
export function showTitleBoxOnCategory(categoryID) {
  return {
    type: SHOW_TITLE_BOX,
    payload: {
      categoryID: categoryID,
    },
    error: false,
  };
}

/**
 * Hides all the textboxes.
 * @return {JSON} the action
 */
export function hideAllTitleBoxes() {
  return {
    type: HIDE_ALL_BOXES,
    error: false,
  };
}
