import fetch from 'cross-fetch';
import * as StatusEnum from '../static/StatusEnum';
import debugConsole from '../debug/debugConsole';

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
 * @param {Number} id
 * @return {func}
 */
export function fetchStudy(id) {
  return function(dispatch) {
    dispatch(loadStudy(StatusEnum.IS_FETCHING));
    fetch('http://127.0.0.1:5000/studies_endpoint?id='+id, {
      method: 'GET',
    })
        .then(
            (response) => response.json().then((json) => {
              dispatch(loadStudy(StatusEnum.SUCCESS, json.study));
            }
            )
        );
  };
}
