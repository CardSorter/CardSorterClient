export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const CHANGE_URL = 'CHANGE_URL';
export const ADD_CARD = 'ADD_CARD';
export const CHANGE_CARD_NAME = 'CHANGE_CARD_NAME';
export const CHANGE_CARD_DESCRIPTION = 'CHANGE_CARD_DESCRIPTION';

/**
 * Changes the title of the study that is going to be created.
 * @param {String} title
 * @return {JSON} the action
 */
export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    payload: {
      title: title,
    },
    error: false,
  };
}

/**
 * Changes the title of the study that is going to be created.
 * @param {String} description
 * @return {JSON} the action
 */
export function changeDescription(description) {
  return {
    type: CHANGE_DESCRIPTION,
    payload: {
      description: description,
    },
    error: false,
  };
}

/**
 * Changes the url of the study that is going to be created.
 * @param {String} url
 * @return {JSON} the action
 */
export function changeURL(url) {
  return {
    type: CHANGE_URL,
    payload: {
      url: url,
    },
    error: false,
  };
}

/**
 * Adds a card to the study that is going to be created.
 * @param {Number} id
 * @param {String} title
 * @param {String} description
 * @return {JSON} the action
 */
export function addCard(id) {
  return {
    type: ADD_CARD,
    payload: {
      id: id,
    },
    error: false,
  };
}

/**
 * Changes the title of a created card.
 * @param {Number} id
 * @param {String} name
 * @return {JSON} the action
 */
export function changeCardName(id, name) {
  return {
    type: CHANGE_CARD_NAME,
    payload: {
      id: id,
      name: name,
    },
    error: false,
  };
}

/**
 * Changes the description of a created card.
 * @param {Number} id
 * @param {String} description
 * @return {JSON} the action
 */
export function changeCardDescription(id, description) {
  return {
    type: CHANGE_CARD_DESCRIPTION,
    payload: {
      id: id,
      description: description,
    },
    error: false,
  };
}
