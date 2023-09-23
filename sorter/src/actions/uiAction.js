import * as responseStatus from '../staticContent/responseStatus';
import {normalizeCategories} from './categoryAction';
import api from './api';

export const SHOW_TITLE_BOX = 'SHOW_TITLE_BOX';
export const HIDE_ALL_BOXES = 'HIDE_ALL_BOXES';
export const SAVE_STUDY_ID = 'SAVE_STUDY_ID';
export const SENDING_SORT = 'SENDING_SORT';
export const SAVE_THANKS_MESSAGE = 'SAVE_THANKS_MESSAGE';
export const RENDER_THANKS_MESSAGE = 'RENDER_THANKS_MESSAGE';
export const TOOGLE_ON_BOARDING = 'TOOGLE_ON_BOARDING';
export const TOGGLE_POPUP = 'TOGGLE_POPUP';
export const POPUP_CHANGE_CONTENT = 'POPUP_CHANGE_CONTENT';
export const START_SORT = 'START_SORT';
export const END_SORT = 'END_SORT';
export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';

/**
 * Toogle the onboarding screen, that helps the user understand what to do.
 * @param {Boolean} show
 * @return {JSON} the action
 */
export function toogleOnBoarding(show) {
  return {
    type: TOOGLE_ON_BOARDING,
    payload: {
      showOnBoarding: show,
    },
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
 * Toggles a popup with the specified title.
 * @param {Bool} flag
 * @param {String} title
 * @return {JSON} the action
 */
export function togglePopup(flag, title) {
  return {
    type: TOGGLE_POPUP,
    payload: {
      flag: flag,
      title: title,
    },
    error: false,
  };
}

/**
 * Changes the content of the text area.
 * @param {String} content
 * @return {JSON} the action
 */
export function popupChangeContent(content) {
  return {
    type: POPUP_CHANGE_CONTENT,
    payload: {
      content: content,
    },
    error: false,
  };
}

/**
 * Defines that the sorting has started.
 * @return {JSON} the action
 */
export function startSort() {
  return {
    type: START_SORT,
    payload: {},
    error: false,
  };
}

/**
 * Defines that the sorting has ended.
 * @return {JSON} the action
 */
export function endSort() {
  return {
    type: END_SORT,
    payload: {},
    error: false,
  };
}

/**
 * Saves the status of the send request
 * @param {ResponseStatus} status
 * @param {JSON} response
 * @param {JSON} error
 * @return {JSON} the action
 */
export function sendingSort(status, response, error) {
  return {
    type: SENDING_SORT,
    payload: {
      status: status,
    },
    error: error,
  };
}

/* Thunk actions */

/**
 *
 * @param {Number} studyID
 * @param {Number[]} container
 * @param {Category[]} categories
 * @param {Date} timeStarted
 * @param {Date} timeEnded
 * @param {String} comment
 * @return {func}
 */
export function sendSort(studyID, container, categories,
    timeStarted, timeEnded, comment) {
  return function(dispatch) {
    const seconds = timeEnded - timeStarted;
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
        time: seconds,
        comment: comment,
      }),
    }).then(
        (response) => response.json().then((json) => {
          dispatch(sendingSort(responseStatus.SUCCESS));
          dispatch(saveThanksMessage(json.message));
          dispatch(renderThanksMessage());
        })
    );
  };
}

export function showingError()
{
  return {
    type: SHOW_ERROR,
    payload: {},
};
}
export function hidingError()
{
  return {
    type: HIDE_ERROR,
    payload: {},
};
}
