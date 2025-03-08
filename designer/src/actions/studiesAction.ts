import {createAction} from '@reduxjs/toolkit';
import fetch from 'cross-fetch';

import * as ActionStatus from 'actions/ActionStatus';
import {setAuthToken} from "./authAction";


export const loadStudies = createAction<{ status: string, studies: any }>("studies/loadStudies");
export const addStudy = createAction<{ study: any }>("studies/addStudy");

/* Thunk actions */

/**
 * Fetches the studies from the server.
 */
export function fetchStudies() {
  return function (dispatch: Function, getState: Function) {
    dispatch(loadStudies({status: ActionStatus.IS_FETCHING, studies: null}));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/studies_endpoint', {
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
                dispatch(setAuthToken(undefined));
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
