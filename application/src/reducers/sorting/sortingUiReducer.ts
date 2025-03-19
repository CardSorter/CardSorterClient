import {createReducer} from '@reduxjs/toolkit';
import * as uiAction from 'actions/sorting/uiAction';

export interface SortingUIState {
  showOnBoarding: boolean;
  studyID?: string;
  studyTitle: string;
  studyDescription: string;
  sendingSort?: string; // typeof ActionStatus
  thanksMessage?: string;
  link?: string;
  showCommentPopup: boolean;
  userComment: string;
  showDescriptionPopup: boolean;
  showConfirmPopUp: boolean;
  timeStarted?: Date;
  errors: {
    categoryMissingTitle: boolean;
    categoriesHaveTheSameName: boolean;
    sameCategoryList: string[];
    noCategoriesCreated: boolean;
  };
}

const initialState: SortingUIState = {
  studyTitle: "",
  studyDescription: "",
  showOnBoarding: true,
  showConfirmPopUp: false,
  showDescriptionPopup: false,
  showCommentPopup: false,
  userComment: "",
  errors: {
    categoryMissingTitle: false,
    noCategoriesCreated: false,
    categoriesHaveTheSameName: false,
    sameCategoryList: [],
  }
};

const sortingUiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(uiAction.toggleOnBoarding, (state, action) => {
      state.showOnBoarding = action.payload;
    })
    .addCase(uiAction.saveStudyID, (state, action) => {
      state.studyID = action.payload.studyID;
    })
    .addCase(uiAction.sendingSort, (state, action) => {
      state.sendingSort = action.payload.status;
    })
    .addCase(uiAction.saveThanksMessage, (state, action) => {
      state.thanksMessage = action.payload.message;
    })
    .addCase(uiAction.saveLink, (state, action) => {
      state.link = action.payload.link;
    })
    .addCase(uiAction.toggleCommentPopup, (state, action) => {
      state.showCommentPopup = action.payload;
    })
    .addCase(uiAction.toggleDescriptionPopup, (state, action) => {
      state.showDescriptionPopup = action.payload;
    })
    .addCase(uiAction.showConfirmPopUp, (state, action) => {
      state.showConfirmPopUp = true;
    })
    .addCase(uiAction.closeConfirmPopUp, (state) => {
      state.showConfirmPopUp = false;
    })
    .addCase(uiAction.setUserComment, (state, action) => {
      state.userComment = action.payload.content;
    })
    .addCase(uiAction.startSort, (state) => {
      state.timeStarted = new Date();
    })
    .addCase(uiAction.showNoCategoryCreatedError, (state, action) => {
      state.errors.noCategoriesCreated = true;
    })
    .addCase(uiAction.showCategoriesWithSameNameError, (state, action) => {
      state.errors.categoriesHaveTheSameName = true;
      state.errors.sameCategoryList = action.payload.categoriesList;
    })
    .addCase(uiAction.showCategoryWithoutTitleError, (state, action) => {
      state.errors.categoryMissingTitle = true;
    })
    .addCase(uiAction.hideErrors, (state) => {
      state.errors.categoryMissingTitle = false;
      state.errors.categoriesHaveTheSameName = false;
      state.errors.noCategoriesCreated = false;
      state.errors.sameCategoryList = [];
    })
    .addCase(uiAction.addTitleDescription, (state, action) => {
      state.studyTitle = action.payload.title;
      state.studyDescription = action.payload.description;
    })
    .addCase(uiAction.clearState, (state) => {
      state.studyTitle = "";
      state.studyDescription = "";
      state.showOnBoarding = true;
      state.showCommentPopup = false;
      state.userComment = "";
      state.timeStarted = undefined;
    })
    .addCase(uiAction.loadSavedState, (state, action) => {
      state.showOnBoarding = action.payload.showOnBoarding;
      state.timeStarted = action.payload.timeStarted;
      state.studyID = action.payload.studyID;
      state.userComment = action.payload.userComment || "";
    })
});

export default sortingUiReducer;
