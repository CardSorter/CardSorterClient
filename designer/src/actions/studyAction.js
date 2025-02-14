import fetch from 'cross-fetch';

import * as StatusEnum from '../static/StatusEnum';
import api from './api';

export const LOAD_STUDIES = 'LOAD_STUDIES';
export const ADD_STUDY = 'ADD_STUDY';

/**
 *
 * @param {StatusEnum} status
 * @param {JSON} response
 * @param {Error} error
 * @return {JSON} the action
 */
export function loadStudies(status, response, error) {
  return {
    type: LOAD_STUDIES,
    payload: {
      status: status,
      studies: response,
    },
    error: error,
  };
}

/**
 * Adds a study to the existing list of studies.
 * @param {StudyCard} study
 * @return {JSON} the action
 */
export function addStudy(study) {
  return {
    type: ADD_STUDY,
    payload: {
      study: study,
    },
    error: false,
  };
}

/* Thunk actions */

/**
 * Fetches the studies from the server.
 * @return {func}
 */
export function fetchStudies() {
  return function(dispatch, getState) {
    dispatch(loadStudies(StatusEnum.IS_FETCHING));
    fetch(api+'/studies_endpoint', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': getState().auth.token,
        'Access-Control-Allow-Credentials': true,
      },
    })
        .then(
            (response) => {
              response.json().then((json) => {
                if (response.status === 401) {
                  // Redirect
                  setTimeout(window.location.reload(true), 1000);
                  window.location.replace(json.location);
                } else {
                  dispatch(loadStudies(StatusEnum.SUCCESS, json.studies));
                }
              },
              (error) => console.log('Error on decoding json: ', error));
            },
            (error) => console.log(error)
        );
  };
}
