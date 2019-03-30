import * as responseStatus from '../staticContent/responseStatus';

export const SHOW_DESCRICTION = 'SHOW_DESCRIPTION';
export const HIDE_ALL_DESCRIPTIONS = 'HIDE_ALL_DESCRIPTIONS';
export const SHOW_TITLE_BOX = 'SHOW_TITLE_BOX';
export const HIDE_ALL_BOXES = 'HIDE_ALL_BOXES';
export const SAVE_STUDY_ID = 'SAVE_STUDY_ID';
export const SENDING_SORT = 'SENDING_SORT';

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

/**
 * Saves the Study id for future reference
 * @param {Number} studyID
 * @return {JSON} the action
 */
export function saveStudyID(studyID) {
  return {
    type: SAVE_STUDY_ID,
    payload: {
      studyID: studyID,
    },
    error: false,
  };
}

/**
 * Saves the status of the send request
 * @param {ResponseStatus} status
 * @return {JSON} the action
 */
export function sendingSort(status) {
  return {
    type: SENDING_SORT,
    payload: {
      status: status,
    },
    error: false,
  };
}

/* Thunk actions */

/**
 *
 * @param {Number} studyID
 * @param {Number[]} container
 * @param {Category[]} categories
 * @return {function}
 */
export function sendSort(studyID, container, categories) {
  return function(dispatch) {
    dispatch(sendingSort(responseStatus.IS_SENDING));
    fetch('http://127.0.0.1:5000/sort_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studyID: studyID,
        categories: categories,
        container: container,
      }),
    }).then(
        () => dispatch(sendingSort(responseStatus.SUCCESS))
    );
  };
}
