export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const RENAME_CATEGORY = 'RENAME_CATEGORY';
export const NORMALIZE_CATEGORIES = 'NORMALIZE_CATEGORIES';

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
 * @param {Number} categoryID
 * @param {Title} title
 * @return {JSON}
 */
export function renameCategory(categoryID, title) {
  return {
    type: RENAME_CATEGORY,
    payload: {
      categoryID: categoryID,
      title: title,
    },
    error: false,
  };
}

/**
 * Normalizes the categories in a way that is recognizable by the server.
 * This includes actions like changing the non-set by the user values to none.
 * This function should be called before the sending to the server.
 * @return {JSON} the action
 */
export function normalizeCategories() {
  return {
    type: NORMALIZE_CATEGORIES,
    payload: {},
    error: false,
  };
}
