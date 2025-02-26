import {createReducer} from '@reduxjs/toolkit';
import * as ActionStatus from 'actions/ActionStatus';
import * as studyCreationActions from 'actions/studyCreationAction';
import {StudyCreationResponse} from "actions/studyCreationAction";

export type StudyCreationPage = "INIT" | "Add_CARDS" | "FINAL" | "SUCCESS";

export interface Card {
  id: number;
  name?: string;
  description?: string;
}

interface UIState {
  studySendingStatus?: ActionStatus.ActionStatus;
  page?: StudyCreationPage;
}

export interface StudyCreationState {
  title?: string;
  description?: string;
  thanksMessage?: string;
  externalSurveyLink?: string;
  errorTitle?: boolean;
  errorDescription?: boolean;
  errorCards?: boolean;
  errorDuplicate?: boolean;
  errorMessage?: boolean;
  url_to_study?: string;
  cards: Record<number, Card>;
  ui: UIState;
  createdStudy?: StudyCreationResponse;
}

const initialState: StudyCreationState = {
  cards: {},
  ui: {},
};

const studyCreationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(studyCreationActions.changeTitle, (state, action) => {
      state.title = action.payload.title;
    })
    .addCase(studyCreationActions.changeDescription, (state, action) => {
      state.description = action.payload.description;
    })
    .addCase(studyCreationActions.addCard, (state, action) => {
      state.cards[action.payload.id] = {
        id: action.payload.id,
        name: undefined,
        description: undefined,
      };
    })
    .addCase(studyCreationActions.addXCards, (state, action) => {
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
    .addCase(studyCreationActions.toggleTitleError, (state, action) => {
      state.errorTitle = action.payload.status;
    })
    .addCase(studyCreationActions.toggleDescriptionError, (state, action) => {
      state.errorDescription = action.payload.status;
    })
    .addCase(studyCreationActions.toggleCardError, (state, action) => {
      state.errorCards = action.payload.status;
    })
    .addCase(studyCreationActions.toggleCardDuplicate, (state, action) => {
      state.errorDuplicate = action.payload.status;
    })
    .addCase(studyCreationActions.toggleThanksError, (state, action) => {
      state.errorMessage = action.payload.status;
    })
    .addCase(studyCreationActions.createStudy, (state, action) => {
      if (action.payload.status === ActionStatus.SUCCESS) {
        state.createdStudy = action.payload.study;
        state.ui.studySendingStatus = ActionStatus.SUCCESS
      }
      state.ui.studySendingStatus = action.payload.status;
    });
});

export default studyCreationReducer;
