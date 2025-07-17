import {createReducer} from '@reduxjs/toolkit';
import * as ActionStatus from 'actions/ActionStatus';
import * as studyCreationActions from 'actions/studyCreationAction';
import {StudyCreationResponse} from "actions/studyCreationAction";




export interface Card {
  id: number;
  name?: string;
  description?: string;
}
export interface Category{
  id: number;
  name: string;
}

interface UIState {
  studySendingStatus?: ActionStatus.ActionStatus;
}

export interface StudyCreationState {
  title?: string;
  description?: string;
  thanksMessage?: string;
  externalSurveyLink?: string;
  cards: Record<number, Card>;
  ui: UIState;
  createdStudy?: StudyCreationResponse;
  sortType?: string;
  categories: Record<number, Category>;
}

export const initialState: StudyCreationState = {
  cards: {},
  categories: {},
  ui: {},
  sortType: "open",
  externalSurveyLink: "",
};

// Keep in mind that the study creation state is saved and preloaded from local storage
const studyCreationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(studyCreationActions.createFromExistingStudy, (state, action) => {
      // TODO: Anti-pattern: state shouldn't hold UI rendered strings
      state.title = action.payload.title + " " + "(copy)";
      state.description = action.payload.description;

      const id = Date.now();
      for (let i = 0; i < action.payload.cards.length; i++) {
        state.cards[id + i] = {
          id: id + i,
          name: action.payload.cards[i].name,
          description: action.payload.cards[i].description,
        };
      }
    })
    .addCase(studyCreationActions.changeTitle, (state, action) => {
      state.title = action.payload.title;
    })
    .addCase(studyCreationActions.changeDescription, (state, action) => {
      state.description = action.payload.description;
    })
    .addCase(studyCreationActions.addCard, (state, action) => {
       if (!state.cards) state.cards = {};
      state.cards[action.payload.id] = {
        id: action.payload.id,
        name: undefined,
        description: undefined,
      };
    })
    .addCase(studyCreationActions.addXCards, (state, action) => {
       if (!state.cards) state.cards = {};
      const id = Date.now();
      for (let i = 0; i < action.payload.no; i++) {
        state.cards[id + i] = {
          id: id + i,
          name: undefined,
          description: undefined,
        };
      }
    })
    .addCase(studyCreationActions.deleteCard, (state, action) => {
      delete state.cards[action.payload.id];
    })
    .addCase(studyCreationActions.changeCardName, (state, action) => {
      const card = state.cards[action.payload.id];
      if (card) {
        card.name = action.payload.name;
      }
    })
    .addCase(studyCreationActions.changeCardDescription, (state, action) => {
      const card = state.cards[action.payload.id];
      if (card) {
        card.description = action.payload.description;
      }
    })
    .addCase(studyCreationActions.changeThanksMessage, (state, action) => {
      state.thanksMessage = action.payload.message;
    })
    .addCase(studyCreationActions.changeExternalSurveyLink, (state, action) => {
      state.externalSurveyLink = action.payload.link;
    })
    .addCase(studyCreationActions.changeSortType, (state, action) => {
      state.sortType = action.payload.sortType;
    })
    .addCase(studyCreationActions.addXCategories, (state, action) => {
      if (!state.categories) state.categories = {};
      const id = Date.now();
      for (let i = 0; i < action.payload.no; i++) {
        state.categories[id + i] = {
          id: id + i,
          name: "", 
        };
      }
    })
    .addCase(studyCreationActions.deleteCategory, (state, action) => {
      delete state.categories[action.payload.id];
    })
    .addCase(studyCreationActions.changeCategoryName, (state, action) => {
      const category = state.categories[action.payload.id];
      if (category) {
        category.name = action.payload.name;
      }
    })
    .addCase(studyCreationActions.createStudy, (state, action) => {
      if (action.payload.status === ActionStatus.SUCCESS) {
        state.createdStudy = action.payload.study;
        state.ui.studySendingStatus = ActionStatus.SUCCESS

        // Clear state
        state.title = undefined;
        state.description = undefined;
        state.thanksMessage = undefined;
        state.externalSurveyLink = undefined;
        state.cards = {};
        state.categories= {};
      }
      state.ui.studySendingStatus = action.payload.status;
    })
});

export default studyCreationReducer;
