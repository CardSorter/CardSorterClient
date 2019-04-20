import * as StatusEnum from '../static/StatusEnum';
import * as studyActions from './studyAction';
import auth from '../auth/authenticator';
import api from './api';

export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const CHANGE_URL = 'CHANGE_URL';
export const ADD_CARD = 'ADD_CARD';
export const CHANGE_CARD_NAME = 'CHANGE_CARD_NAME';
export const CHANGE_CARD_DESCRIPTION = 'CHANGE_CARD_DESCRIPTION';
export const CHANGE_THANKS_MESSAGE = 'CHANGE_THANKS_MESSAGE';
export const CREATE_STUDY = 'CREATE_STUDY';
export const SHOW_PAGE = 'SHOW_PAGE';

export const CHECK_TITLE = 'CHECK_TITLE';
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
 * Async action for checking the validity of the title.
 * @param {StatusEnum} status
 * @param {Boolean} validTitle
 * @param {Error} error
 * @return {JSON} the action
 */
export function checkTitle(status, validTitle, error) {
  return {
    type: CHECK_TITLE,
    payload: {
      status: status,
      payload: {
        validTitle: validTitle,
      },
    },
    error: error,
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
      reponse: response,
      error: error,
    },
  };
}

/* Thunk actions */

/**
 *
 * @param {*} title
 * @return {func}
 */
export function sendTitle(title) {
  return function(dispatch) {
    dispatch(checkTitle(StatusEnum.IS_FETCHING));
    fetch('http://127.0.0.1:5000/studies_endpoint?title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
      }),
    })
        .then(
            (response) => response.json().then((json) =>
              dispatch(checkTitle(StatusEnum.SUCCESS, json.isValid))
            )
        );
  };
}

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
