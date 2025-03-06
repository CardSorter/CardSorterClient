import {createAction} from '@reduxjs/toolkit';
import fetch from 'cross-fetch';

import * as ActionStatus from 'actions/ActionStatus';
import api from './api';


export const loadStudies = createAction<{ status: string, studies: any }>("study/loadStudies");
export const addStudy = createAction<{ study: any }>("study/addStudy");

/* Thunk actions */

/**
 * Fetches the studies from the server.
 */
export function fetchStudies() {
  return function (dispatch: Function, getState: Function) {
    dispatch(loadStudies({status: ActionStatus.IS_FETCHING, studies: null}));
    fetch(api + '/studies_endpoint', {
      method: 'GET',
      // withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': getState().auth.token,
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then(
        (response) => {
          response.json().then((json) => {
              if (response.status === 401) {
                // Redirect
                setTimeout(() => window.location.reload(), 1000);
                window.location.replace(json.location);
              } else {
                dispatch(loadStudies({status: ActionStatus.SUCCESS, studies: json.studies}));
              }
            },
            (error) => console.log('Error on decoding json: ', error));
        },
        (error) => console.log(error)
      );
  };
}
