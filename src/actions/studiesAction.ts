import {createAction} from '@reduxjs/toolkit';
import fetch from 'cross-fetch';

import * as ActionStatus from 'actions/ActionStatus';
import {setAuthToken} from "./authAction";
import {StudyFilters} from "../reducers/studiesReducer";


export const loadStudies = createAction<{ status: string, studies: any }>("studies/loadStudies");
export const addStudy = createAction<{ study: any }>("studies/addStudy");
export const setStudyFilter = createAction<{ filter: StudyFilters | undefined }>("studies/setStudyFilter");
export const setSearchTerm = createAction<string>("studies/setSearchTerm");
export const setSortOption = createAction<string>("studies/setSortOption");


/* Thunk actions */

/**
 * Fetches the studies from the server.
 */
export function fetchStudies() {
  return function (dispatch: Function, getState: Function) {
    dispatch(loadStudies({status: ActionStatus.IS_FETCHING, studies: null}));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/studies_endpoint', {
      method: 'GET',
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
            (error) => console.error('Error on decoding json: ', error));
        },
        (error) => console.error(error)
      );
  };
}
