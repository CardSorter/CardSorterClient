import * as StatusEnum from '../static/StatusEnum';
import * as studyActions from './studyAction';
import auth from '../auth/authenticator';
import api from './api';

export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const ADD_CARD = 'ADD_CARD';
export const ADD_X_CARDS = 'ADD_X_CARDS';
export const DELETE_CARD = 'DELETE_CARD';
export const CHANGE_CARD_NAME = 'CHANGE_CARD_NAME';
export const CHANGE_CARD_DESCRIPTION = 'CHANGE_CARD_DESCRIPTION';
export const CHANGE_THANKS_MESSAGE = 'CHANGE_THANKS_MESSAGE';
export const CREATE_STUDY = 'CREATE_STUDY';
export const SHOW_PAGE = 'SHOW_PAGE';
export const OPEN_STUDY_PAGE = 'OPEN_STUDY_PAGE';
export const TOGGLE_TITLE_ERROR = 'TOGGLE_TITLE_ERROR';
export const TOGGLE_DESCRIPTION_ERROR = 'TOGGLE_DESCRIPTION_ERROR';
export const TOGGLE_CARD_ERROR = 'TOGGLE_CARD_ERROR';
export const TOGGLE_THANKS_ERROR = 'TOGGLE_THANKS_ERROR';

export const SEND_STUDY = 'SEND_STUDY';

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
 * Adds x number of cards to the study that is going to be created.
 * @param {Number} no
 * @return {JSON} the action
 */
export function addXCards(no) {
  return {
    type: ADD_X_CARDS,
    payload: {
      no: no,
    },
    error: false,
  };
}

/**
 * Deletes a card from the created cards.
 * @param {Number} id
 * @return {JSON} the action
 */
export function deleteCard(id) {
  return {
    type: DELETE_CARD,
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

/**
 * Changes the thanks message of the study.
 * @param {String} message
 * @return {JSON} the action
 */
export function changeThanksMessage(message) {
  return {
    type: CHANGE_THANKS_MESSAGE,
    payload: {
      message: message,
    },
    error: false,
  };
};

/**
 * Changes the showing page.
 * @param {Number} pageNo
 * @return {JSON} the action
 */
export function showPage(pageNo) {
  return {
    type: SHOW_PAGE,
    payload: {
      pageNo: pageNo,
    },
    error: false,
  };
}

/**
 * Toogle the error flag on the title input.
 * @param {Boolean} status
 * @return {JSON} the action.
 */
export function toggleTitleError(status) {
  return {
    type: TOGGLE_TITLE_ERROR,
    payload: {
      status: status,
    },
    error: false,
  };
}

/**
 * Toogle the error flag on the description input.
 * @param {Boolean} status
 * @return {JSON} the action.
 */
export function toggleDescriptionError(status) {
  return {
    type: TOGGLE_DESCRIPTION_ERROR,
    payload: {
      status: status,
    },
    error: false,
  };
}

/**
 * Toogle the error flag on the card input.
 * @param {Boolean} status
 * @return {JSON} the action.
 */
export function toggleCardError(status) {
  return {
    type: TOGGLE_CARD_ERROR,
    payload: {
      status: status,
    },
    error: false,
  };
}

/**
 * Toogle the error flag on the thanks input.
 * @param {Boolean} status
 * @return {JSON} the action.
 */
export function toggleThanksError(status) {
  return {
    type: TOGGLE_THANKS_ERROR,
    payload: {
      status: status,
    },
    error: false,
  };
}

/**
 * Async action for sending the created study to the server.
 * @param {*} status
 * @param {JSON} response
 * @param {*} error
 * @return {JSON} the action
 */
export function createStudy(status, response, error) {
  return {
    type: CREATE_STUDY,
    payload: {
      status: status,
      study: response,
      error: error,
    },
  };
}

/**
 * Redirects to the created study.
 * @return {JSON} the action
 */
export function openStudyPage() {
  return {
    type: OPEN_STUDY_PAGE,
    payload: {
    },
    error: false,
  };
}

/* Thunk actions */

/**
 * @param {Object} study
 * @return {func}
 */
export function sendStudy(study) {
  return function(dispatch) {
    dispatch(createStudy(StatusEnum.IS_FETCHING));
    fetch(api+'/studies_endpoint', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.getToken(),
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(study),
    })
        .then(
            (response) => response.json().then((json) => {
              if (response.status === 401) {
                // Redirect
                setTimeout(window.location.reload(true), 1000);
                window.location.replace(json.location);
              } else {
                dispatch(studyActions.addStudy(json.study));
                dispatch(createStudy(StatusEnum.SUCCESS, json.study));
              }
            }
            )
        );
  };
}
