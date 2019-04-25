import fetch from 'cross-fetch';
import * as StatusEnum from '../static/StatusEnum';
import auth from '../auth/authenticator';
import api from './api';

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const LOAD_STUDY = 'LOAD_STUDY';

/**
 * Changes the view that the study page is showing.
 * @param {Number} viewNo
 * @return {JSON} the action.
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
 * Async action for loading a study, given an id.
 * @param {StatusEnum} status
 * @param {JSON} response
 * @param {Error} error
 * @return {JSON} the action.
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

/* Thunk actions */

/**
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
