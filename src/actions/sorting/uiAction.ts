import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as ActionStatus from 'actions/ActionStatus';
import fetch from "cross-fetch";
import {requestCards, toggleNotFound} from "./sortingBoardAction";
import { loadCategories } from './sortingBoardAction';
import { SortingCategory } from "reducers/sorting/sortingBoardReducer";



export interface CategoryRequest {
  cards: number[],
  id: number,
  title: string
}

export const toggleOnBoarding = createAction<boolean>("ui/toggleOnBoarding");
export const saveStudyID = createAction<{ studyID: string }>("ui/saveStudyID");
export const saveThanksMessage = createAction<{ message: string }>("ui/saveThanksMessage");
export const saveLink = createAction<{ link: string }>("ui/saveLink");
export const toggleCommentPopup = createAction<boolean>("ui/toggleCommentPopup");
export const toggleDescriptionPopup = createAction<boolean>("ui/toggleDescriptionPopup");
export const toggleInstructionsPopup= createAction<boolean>("ui/toggleInstructionsPopup");

export const showConfirmPopUp = createAction("ui/showConfirmPopUp");
export const closeConfirmPopUp = createAction("ui/closeConfirmPopUp");

export const setUserComment = createAction<{ content: string }>("ui/setUserComment");
export const startSort = createAction("ui/startSort");
export const sendingSort = createAction<{ status: string; response?: any; error?: any }>("ui/sendingSort");
export const addTitleDescription = createAction<{ title: string; description: string }>("ui/addTitleDescription");


export const setCategories= createAction<{ categories: Record<string, string>}>("ui/setCategories");
export const setSortType = createAction<'open' | 'closed' | 'hybrid'>("sortingUi/setSortType");
export const setTimeStarted = createAction<Date>("sortingUi/setTimeStarted");


export const showNoCategoryCreatedError = createAction("ui/showNoCategoryCreatedError");
export const showCategoryWithoutTitleError = createAction("ui/showCategoryWithoutTitleError");
export const showCategoriesWithSameNameError = createAction<{categoriesList: string[]}>("ui/showCategoriesWithSameNameError");
export const hideErrors = createAction("ui/hideErrors");
export const clearState = createAction("ui/clearState");

export const showCommentSaved = createAction("ui/showCommentSaved");
export const hideCommentSaved = createAction("ui/hideCommentSaved");
export const setCommentSaved = createAction<boolean>("sortingUi/setCommentSaved");




export const loadSavedState = createAction<{
  showOnBoarding: boolean;
  timeStarted?: Date;
  studyID?: string;
  userComment?: string;
  sortType: 'open' | 'closed' | 'hybrid';

}>("ui/loadSavedState");

export const fetchStudyForSorting = createAsyncThunk<
  void,
  { studyID: string; preloaded?: boolean }
>('sortingBoard/fetchStudyForSorting', async ({ studyID, preloaded }, { dispatch }) => {
  dispatch(saveStudyID({ studyID }));
  dispatch(requestCards({ status: ActionStatus.IS_FETCHING }));

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sort_endpoint?cards=true&study_id=${studyID}`);
    const json = await response.json();
    console.log("Dispatched sortType:", json.sortType);


    if (response.status === 404) {
      dispatch(requestCards({ status: ActionStatus.SUCCESS }));
      dispatch(toggleNotFound());
      return;
    }

    if (preloaded) {
      // We already have the data from the localstorage
      return;
    }

    dispatch(requestCards({ status: ActionStatus.SUCCESS, response: json }));
    dispatch(addTitleDescription({ title: json.title, description: json.description }));
    dispatch(setSortType(json.sortType));
    dispatch(toggleOnBoarding(true));

    
    if (json.sortType === "closed" || json.sortType === "hybrid") {
      dispatch(setCategories({ categories: json.categories }));

      const formattedCategories = Object.entries(json.categories)
       .filter(([id, title]) => !isNaN(Number(id)) && typeof title === "string")
       .map(([id, title]) => ({
         id: Number(id),
         title,
         cards: [],
         isMinimized: false,
         predefined: true,
      }));


      
      dispatch(loadCategories({ categories: formattedCategories as SortingCategory[] }));

    }

  } catch (error) {
    console.error(error);
  }
});


export function sendSort(
  studyID: string,
  unsortedCards: number[],
  categories: Record<number, CategoryRequest>,
  timeStarted: Date,
  timeEnded: Date,
  comment: string
){
  return function (dispatch: any , getState:any) {
    const ms = (timeEnded.getTime() - timeStarted.getTime());
    const sortType = getState().sortingUi.sortType;

    
// get sorttype and predefinedCategories
    dispatch(sendingSort({status: ActionStatus.IS_FETCHING}));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sort_endpoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studyID: studyID,
        categories: categories,
        container: unsortedCards,
        time: ms,
        comment: comment,
        sortType: sortType
      }),
    }).then((response) =>
      response.json().then((json) => {
        dispatch(sendingSort({status: ActionStatus.SUCCESS}));
        dispatch(saveThanksMessage({message: json[0]['message']}));
        dispatch(saveLink({link: json[1]['link']}));
      })
    );
  };
}
