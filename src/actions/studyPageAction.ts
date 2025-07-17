import {createAction} from '@reduxjs/toolkit';
import fetch from 'cross-fetch';
import * as ActionStatus from 'actions/ActionStatus';
import {setAuthToken} from "./authAction";
import { setSortType } from './sorting/uiAction';
import {displayTemporaryAlert} from "./applicationAlertsAction";
import {ApplicationAlertContext} from "../reducers/applicationAlertsReducer";


export interface SortingDataItem {
  cards: string[],
  category: string,
  comment: string,
  no: string, // number of categories
  
}



// TODO type the anys here
interface FetchStudyResponse {
  id: string; // Study ID
  title: string; // Title of the study
  description: string; // Description of the study
  isLive: boolean; // Whether the study is live
  launchedDate: Date; // Date the study was launched
  ended?: Date; // Date the study ended, optional
  participants: {
    completion: string; // Percentage of completion (e.g. "0%")
    total: number; // Total participants
    completed: number; // Number of completed participants
    data: (number | string)[][]; // 0: participant no, 1: time taken, 2: completion rate 3: categories created
  } | number;
  sorting: {
    data: SortingDataItem[];
  };
  cards: {
    average: string; // Average completion, e.g. "0%"
    total: number; // Total number of cards
    sorted: number; // Number of sorted cards
    data: {
      name: string,
      categories_no: number,
      category_names: string[],
      frequencies: number[],
      description: string,
      
    }[]; // Data related to cards
  };
  categories: {
    similarity: string; // Percentage similarity, e.g. "0%"
    total: number; // Total categories
    similar: number; // Number of similar categories
    merged: number; // Number of merged categories
    data: any[]; // Data related to categories
  };
  similarityMatrix: any; // The similarity matrix can be a multidimensional array or object

}

export const loadStudy = createAction<{ status: string, study?: FetchStudyResponse, error: boolean }>("studyPage/loadStudy");
export const loadClusters = createAction<{ status: string, clusters?: any, error: boolean }>("studyPage/loadClusters");
export const downloadXLSX = createAction<{ studyId: string; }>("studyPage/downloadXLSX");





/* Thunk actions */

/**
 * Fetches the study's attributes from the backend
 * @param id - Study id
 * @return A Redux Thunk function
 */
export function fetchStudy(id: string) {
  return function (dispatch: Function, getState: Function) {
    dispatch(loadStudy({status: ActionStatus.IS_FETCHING, error: false}));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/studies_endpoint?id=${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': getState().auth.token,
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((response) =>
        response.json().then((json) => {
          if (response.status === 401) {
            dispatch(setAuthToken(undefined));
          } else {

            dispatch(loadStudy({status: ActionStatus.SUCCESS, study: json.study, error: false}));
            dispatch(setSortType(json.study.sortType));
          }
        })
      );
  };
}

/**
 * Fetches the study's clusters from the backend
 * @param id - Study id
 * @return A Redux Thunk function
 */
export function fetchClusters(id: string) {
  return function (dispatch: Function, getState: Function) {
    dispatch(loadClusters({status: ActionStatus.IS_FETCHING, error: false}));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/studies_endpoint?id=${id}&clusters=true`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': getState().auth.token,
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((response) =>
        response.json().then((json) => {
          if (response.status === 401) {
            dispatch(setAuthToken(undefined));
          } else {
            dispatch(loadClusters({status: ActionStatus.SUCCESS, clusters: json.clusters, error: false}));
          }
        })
      );
  };
}

export const updateStudy = (studyId: string, updatedProperties: Record<string, any>) => {
  return (dispatch: Function, getState: Function) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/studies_endpoint?id=${studyId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getState().auth.token,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(updatedProperties),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(fetchStudy(studyId));
          dispatch(displayTemporaryAlert('Study updated', ApplicationAlertContext.studyPage, "success"));
        } else {
          dispatch(displayTemporaryAlert('An error occurred while updating the study', ApplicationAlertContext.studyPage, "error"));
        }
      })
      .catch((error) => {
        dispatch(displayTemporaryAlert('An error occurred while updating the study', ApplicationAlertContext.studyPage, "error"));
      });
  };
};

export const deleteStudy = (studyId: string) => {
  return (dispatch: Function, getState: Function) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/studies_endpoint?id=${studyId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getState().auth.token,
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((response) => {
        if (response.ok) {
          dispatch(displayTemporaryAlert('Study deleted', ApplicationAlertContext.application, "success"));
        } else {
          dispatch(displayTemporaryAlert('An error occurred while deleting the study', ApplicationAlertContext.application, "error"));
        }
      })
      .catch((error) => {
        dispatch(displayTemporaryAlert('An error occurred while deleting the study', ApplicationAlertContext.application, "error"));
      });
  };
};
