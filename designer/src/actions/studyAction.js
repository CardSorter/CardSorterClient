import fetch from 'cross-fetch';
import * as StatusEnum from '../static/StatusEnum';
import debugConsole from '../debug/debugConsole';

export const LOAD_STUDIES = 'LOAD_STUDIES';
export const REQUEST_STUDIES = 'REQUEST_STUDIES';
export const ADD_STUDY = 'ADD_STUDY';

/**
 *
 * @param {StatusEnum} status
 * @param {Error} error
 * @return {JSON} the action
 */
export function requestStudies(status, error) {
  return {
    type: REQUEST_STUDIES,
    payload: {
      status: status,
    },
    error: error || false,
  };
}


/**
 *
 * @param {StudyCard[]} studies
 * @return {JSON} the action
 */
export function loadStudies(studies) {
  return {
    type: LOAD_STUDIES,
    payload: {
      studies: studies,
    },
    error: false,
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
  return function(dispatch) {
    dispatch(requestStudies(StatusEnum.IS_FETCHING));

    fetch('http://127.0.0.1:5000/studies_endpoint')
        .then(
            (response) => response.json().then((json) => {
              dispatch(requestStudies(StatusEnum.SUCCESS));
              dispatch(loadStudies(json.studies));
            }),
            (error) => debugConsole(error)
        );
  };
}
