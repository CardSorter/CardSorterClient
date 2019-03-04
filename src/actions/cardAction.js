export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const ADD_CARD_CATEGORY = 'ADD_CARD_CATEGORY';
export const REMOVE_CARD_CATEGORY = 'REMOVE_CARD_CATEGORY';
export const ADD_CARD_CONTAINER = 'ADD_CARD_CONTAINER';
export const REMOVE_CARD_CONTAINER = 'REMOVE_CARD_CONTAINER';

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
 * @param {int} categoryID
 * @return {JSON} the action
 */
export function removeCategory(categoryID) {
  return {
    type: REMOVE_CATEGORY,
    payload: {
      categoryID: categoryID,
    },
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
      cardID: cardID,
      categoryID: categoryID,
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
      cardID: cardID,
      categoryID: categoryID,
    },
    error: false,
  };
}

/**
 *
 * @param {int} cardID
 * @return {JSON} the action
 */
export function addCardToContainer(cardID) {
  return {
    type: ADD_CARD_CONTAINER,
    payload: {
      cardID: cardID,
    },
    error: false,
  };
}

/**
 *
 * @param {int} cardID
 * @return {JSON} the action
 */
export function removeCardFromContainer(cardID) {
  return {
    type: REMOVE_CARD_CONTAINER,
    payload: {
      cardID: cardID,
    },
    error: false,
  };
}

