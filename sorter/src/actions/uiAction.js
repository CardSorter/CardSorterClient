import * as responseStatus from '../staticContent/responseStatus';
import {normalizeCategories} from './categoryAction';
import api from './api';

export const SHOW_DESCRICTION = 'SHOW_DESCRIPTION';
export const HIDE_ALL_DESCRIPTIONS = 'HIDE_ALL_DESCRIPTIONS';
export const SHOW_TITLE_BOX = 'SHOW_TITLE_BOX';
export const HIDE_ALL_BOXES = 'HIDE_ALL_BOXES';
export const SAVE_STUDY_ID = 'SAVE_STUDY_ID';
export const SENDING_SORT = 'SENDING_SORT';
export const SAVE_THANKS_MESSAGE = 'SAVE_THANKS_MESSAGE';
export const RENDER_THANKS_MESSAGE = 'RENDER_THANKS_MESSAGE';

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
 * Saves the thanks message of the study.
 * @param {String} message
 * @return {JSON} the action
 */
export function saveThanksMessage(message) {
  return {
    type: SAVE_THANKS_MESSAGE,
    payload: {
      message: message,
    },
    error: false,
  };
}

/**
 * Flags that the thanks message screen must be shown
 * @return {JSON} the action
 */
export function renderThanksMessage() {
  return {
    type: RENDER_THANKS_MESSAGE,
    payload: {},
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
    dispatch(normalizeCategories());
    dispatch(sendingSort(responseStatus.IS_SENDING));
    fetch(api+'/sort_endpoint', {
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
        (response) => response.json().then((json) => {
          console.log(json);
          dispatch(sendingSort(responseStatus.SUCCESS));
          dispatch(saveThanksMessage(json.message));
          dispatch(renderThanksMessage());
        })
    );
  };
}
