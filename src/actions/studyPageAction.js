import fetch from 'cross-fetch';
import * as StatusEnum from '../static/StatusEnum';
import auth from '../auth/authenticator';
import api from './api';

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const LOAD_STUDY = 'LOAD_STUDY';
export const CHANGE_HOVERED_CARDS = 'CHANGE_HOVERED_CARDS';
export const LOAD_CLUSTERS = 'LOAD_CLUSTERS';
export const TOGGLE_POPUP = 'TOGGLE_POPUP';

/**
 * Changes the view that the study page is showing.
 * @param {Number} viewNo
 */
export function changeView(viewNo) {
  return {
    type: CHANGE_VIEW,
    payload: {
      no: viewNo,
    },
    error: false,
  };
}

/**
 * Changes the selected card labels, when a percentage is selected.
 * @param {Number} card1Index
 * @param {Number} card2Index
 */
export function changeHoveredCards(card1Index, card2Index) {
  return {
    type: CHANGE_HOVERED_CARDS,
    payload: {
      index1: card1Index,
      index2: card2Index,
    },
    error: false,
  };
}

/**
 * Toogles the popup.
 * @param {Boolean} toggle
 */
export function togglePopup(toggle) {
  return {
    type: TOGGLE_POPUP,
    payload: {
      toggle: toggle,
    },
    error: false,
  };
}

/**
 * Async action for loading a study, given an id.
 * @param {StatusEnum} status
 * @param {JSON} response
 * @param {Error} error
 */
export function loadStudy(status, response, error) {
  return {
    type: LOAD_STUDY,
    payload: {
      status: status,
      study: response,
    },
    error: error,
  };
}

/**
 * Async action for loading a study, given an id.
 * @param {StatusEnum} status
 * @param {JSON} response
 * @param {Error} error
 */
export function loadClusters(status, response, error) {
  return {
    type: LOAD_CLUSTERS,
    payload: {
      status: status,
      clusters: response,
    },
    error: error,
  };
}

/* Thunk actions */

/**
 * Fetches the study's attributes from the backend
 * @param {String} id
 * @return {func}
 */
export function fetchStudy(id) {
  return function(dispatch) {
    dispatch(loadStudy(StatusEnum.IS_FETCHING));
    fetch(api+'/studies_endpoint?id='+id, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': auth.getToken(),
        'Access-Control-Allow-Credentials': true,
      },
    })
        .then(
            (response) => response.json().then((json) => {
              if (response.status === 401) {
                // Redirect
                setTimeout(window.location.reload(true), 1000);
                window.location.replace(json.location);
              } else {
                dispatch(loadStudy(StatusEnum.SUCCESS, json.study));
              }
            }
            )
        );
  };
}

/**
 * Fetches the study's clusters from the backend
 * @param {String} id
 * @return {func}
 */
export function fetchClusters(id) {
  return function(dispatch) {
    dispatch(loadClusters(StatusEnum.IS_FETCHING));
    fetch(api+'/studies_endpoint?id='+id+'&clusters='+true, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': auth.getToken(),
        'Access-Control-Allow-Credentials': true,
      },
    })
        .then(
            (response) => response.json().then((json) => {
              if (response.status === 401) {
                // Redirect
                setTimeout(window.location.reload(true), 1000);
                window.location.replace(json.location);
              } else {
                dispatch(loadClusters(StatusEnum.SUCCESS, json.clusters));
              }
            }
            )
        );
  }
}