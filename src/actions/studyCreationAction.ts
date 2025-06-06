import {createAction, Dispatch, ThunkAction, UnknownAction} from '@reduxjs/toolkit';
import * as ActionStatus from 'actions/ActionStatus';
import * as studyActions from './studiesAction';
import StateSchema from "../reducers/StateSchema";
import {Card} from "../reducers/studyCreationReducer";
import {setAuthToken} from "./authAction";

export const changeTitle = createAction<{ title: string }>('studyCreation/changeTitle');
export const changeDescription = createAction<{ description: string }>('studyCreation/changeDescription');
export const addCard = createAction<{ id: number }>('studyCreation/addCard');
export const addXCards = createAction<{ no: number }>('studyCreation/addXCards');
export const deleteCard = createAction<{ id: number }>('studyCreation/deleteCard');
export const changeCardName = createAction<{ id: number; name: string }>('studyCreation/changeCardName');
export const changeCardDescription = createAction<{
  id: number;
  description: string
}>('studyCreation/changeCardDescription');
export const changeThanksMessage = createAction<{ message: string }>('studyCreation/changeThanksMessage');
export const changeExternalSurveyLink = createAction<{ link: string }>('studyCreation/changeExternalSurveyLink');
export const toggleTitleError = createAction<{ status: boolean }>('studyCreation/toggleTitleError');
export const toggleDescriptionError = createAction<{ status: boolean }>('studyCreation/toggleDescriptionError');
export const toggleCardError = createAction<{ status: boolean }>('studyCreation/toggleCardError');
export const toggleCardDuplicate = createAction<{ status: boolean }>('studyCreation/toggleCardDuplicate');
export const toggleThanksError = createAction<{ status: boolean }>('studyCreation/toggleThanksError');
export const changeSortType = createAction<{ sortType: string }>('studyCreation/changeSortType');
export const addXCategories = createAction<{ no: number }>('studyCreation/addXCategories');
export const changeCategoryName = createAction<{ id: number; name: string }>('studyCreation/changeCategoryName');
export const deleteCategory = createAction<{ id: number }>('studyCreation/deleteCategory');
export const toggleCategoryError = createAction<{ status: boolean; type?: "empty" | "duplicate" | null }>('studyCreation/toggleCategoryError');


export const createFromExistingStudy = createAction<{
  title: string;
  description: string;
  cards: {name: string, description: string}[];
}>('studyCreation/createFromExistingStudy');

export interface StudyCreationResponse {
  id: string,
  title: string,
  abandonedNo: number,
  completedNo: number,
  editDate: Date,
  isLive: boolean,
  launchedDate: Date,
}

export const createStudy = createAction<{
  status: ActionStatus.ActionStatus | undefined;
  study?: StudyCreationResponse ;
  error: boolean
}>('studyCreation/createStudy');

export function sendStudy(study: {title: string, description: string, cards: Record<number, Card>, message: string, sortType: string,
   link?: string, categories?: Record<string, string>; }): ThunkAction<void, StateSchema, unknown, UnknownAction> {
  return function (dispatch: Dispatch, getState: () => StateSchema) {
    dispatch(createStudy({status: ActionStatus.IS_FETCHING, error: false}));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/studies_endpoint', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": getState().auth.token || "",
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(study),
    }).then((response) =>
      response.json().then((json) => {
        if (response.status === 401) {
          dispatch(setAuthToken(undefined));
        } else {
          dispatch(studyActions.addStudy(json.study));
          dispatch(createStudy({status: ActionStatus.SUCCESS, study: json.study, error: false}));
        }
      })
    );
  };
}
