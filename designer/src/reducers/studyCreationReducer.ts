import {createReducer} from '@reduxjs/toolkit';
import * as ActionStatus from 'actions/ActionStatus';
import * as studyCreationActions from 'actions/studyCreationAction';

interface Card {
  id: number;
  name?: string;
  description?: string;
}

interface UIState {
  currentPage: number;
  studySending?: string;
  titleFetching: any,
  validTitle: boolean,
}

export interface StudyCreationState {
  title?: string;
  description?: string;
  thanksMessage?: string;
  link?: string;
  errorTitle?: boolean;
  errorDescription?: boolean;
  errorCards?: boolean;
  errorDuplicate?: boolean;
  errorMessage?: boolean;
  url_to_study?: string;
  share_url?: string;
  cards: Record<number, Card>;
  ui: UIState;
}

const initialState: StudyCreationState = {
  cards: {},
  ui: {
    currentPage: 0,
    titleFetching: null,
    validTitle: false
  }
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
    .addCase(studyCreationActions.changeLink, (state, action) => {
      state.link = action.payload.link;
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
    .addCase(studyCreationActions.showPage, (state, action) => {
      state.ui.currentPage = action.payload.pageNo;
    })
    .addCase(studyCreationActions.openStudyPage, (state) => {
      window.location.assign(state.url_to_study ?? '');
    })
    .addCase(studyCreationActions.createStudy, (state, action) => {
      if (action.payload.status === ActionStatus.SUCCESS) {
        state.url_to_study = action.payload.study.url_to_study;
        state.share_url = action.payload.study.share_url;
        state.ui.currentPage = 4;
      }
      state.ui.studySending = action.payload.status;
    });
});

export default studyCreationReducer;
