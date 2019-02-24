export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const ADD_CARD_CATEGORY = 'ADD_CARD_CATEGORY';
export const REMOVE_CARD_CATEGORY = 'ADD_CARD_CATEGORY';

// Action creators //

/**
 *
 * @param {int} categoryID
 * @param {string} title
 * @param {int} cardID
 * @return {JSON} the action
 */
export function createCategory(categoryID, title, cardID) {
  return {
    type: CREATE_CATEGORY,
    payload: {
      categoryID: categoryID,
      title: title,
      cardID: cardID,
    },
    error: false,
  };
}

/**
 *
 * @param {int} cardID
 * @param {int} categoryID
 * @return {JSON} the action
 */
export function addCardToCategory(cardID, categoryID) {
  return {
    type: ADD_CARD_CATEGORY,
    payload: {
      card_id: cardID,
      category_id: categoryID,
    },
    error: false,
  };
}

/**
 *
 * @param {int} cardID
 * @param {int} categoryID
 * @return {JSON} the action
 */
export function removeCardFromCategory(cardID, categoryID) {
  return {
    type: REMOVE_CARD_CATEGORY,
    payload: {
      card_id: cardID,
      category_id: categoryID,
    },
    error: false,
  };
}
