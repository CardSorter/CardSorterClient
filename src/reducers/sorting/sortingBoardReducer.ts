import {createReducer} from '@reduxjs/toolkit';
import * as sortingBoardAction from 'actions/sorting/sortingBoardAction';

export interface SortingCard {
  id: number;
  name: string;
  description?: string;
  descriptionShowing: boolean;
}

export interface SortingCategory {
  id: number;
  title?: string;
  isMinimized?: boolean;
  cards: SortingCard[];
}

export interface SortingBoardState {
  unsortedCards: SortingCard[];
  status?: string;
  notFound?: boolean;
  categories: Record<number, SortingCategory>;
}

const initialState: SortingBoardState = {
  unsortedCards: [],
  categories: {},
  status: undefined,
  notFound: false,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(sortingBoardAction.requestCards, (state, action) => {
      const response = action.payload.response;
      if (response) {
        state.unsortedCards = response.cards.map((card) => ({
          id: card.id,
          name: card.name,
          description: card.description,
          descriptionShowing: false,
        }));
      }
      state.status = action.payload.status;
    })
    .addCase(sortingBoardAction.toggleDescription, (state, action) => {
      const cardID = action.payload.cardID;
      // Description is always visible if the card is unsorted, so the action must have been triggered from a card in
      // a category

      const category = Object.values(state.categories)
        .find((category) => category.cards.findIndex((card) => card.id === cardID) > -1);

      if (category) {
        state.categories[category.id].cards.forEach((card) => {
          if (card.id === cardID) {
            card.descriptionShowing = !card.descriptionShowing;
          }
        })
      }
    })
    .addCase(sortingBoardAction.createCategory, (state, action) => {
      const id = action.payload.categoryID || Date.now();

      state.categories[id] = {id: id, cards: []};
      const card = state.unsortedCards.find((card) => card.id === action.payload.cardID);

      if (card) {
        state.categories[id] = {id: id, cards: [card]};
        // Remove the added card from the unsorted list
        state.unsortedCards = state.unsortedCards.filter((card) => card.id !== action.payload.cardID);
      }
    })
    .addCase(sortingBoardAction.removeCategory, (state, action) => {
      const categoryID = action.payload.categoryID;
      // Add cards back to the unsorted list
      state.unsortedCards = state.unsortedCards.concat(state.categories[categoryID].cards);

      delete state.categories[categoryID];
    })
    .addCase(sortingBoardAction.renameCategory, (state, action) => {
      const id = action.payload.categoryID;
      state.categories[id].title = action.payload.title;
    })
    .addCase(sortingBoardAction.addCardToCategory, (state, action) => {
      const cardID = action.payload.cardID;
      const categoryID = action.payload.categoryID;

      const card = state.unsortedCards.find((card) => card.id === cardID);
      if (card) {
        // Add card to category
        state.categories[categoryID].cards.push(card);

        // Remove card from the unsorted list (if exists)
        state.unsortedCards = state.unsortedCards.filter((card) => card.id !== cardID);
      }
    })
    .addCase(sortingBoardAction.removeCardFromCategory, (state, action) => {
      const cardID = action.payload.cardID;
      const categoryID = action.payload.categoryID;

      const card = state.categories[categoryID].cards.find((card) => card.id === cardID);
      if (card) {
        state.categories[categoryID].cards = state.categories[categoryID].cards.filter((card) => card.id !== cardID);
        state.unsortedCards.push(card);

        // Delete empty categories
        for (const i in state.categories) {
          if (state.categories[i].cards.length < 1) {
            delete state.categories[i];

            // Only one category can be empty on each state update
            break;
          }
        }
      }
    })
    .addCase(sortingBoardAction.minimizeCategory, (state, action) => {
      const categoryID = action.payload.id;
      state.categories[categoryID].isMinimized = !state.categories[categoryID].isMinimized;
    })
    .addCase(sortingBoardAction.toggleNotFound, (state) => {
      state.notFound = true;
    })
    .addCase(sortingBoardAction.clearState, (state) => {
        state.unsortedCards =  [];
        state.categories =  {};
        state.status =  undefined;
        state.notFound =  false;
    })
    .addCase(sortingBoardAction.loadSavedState, (state, action) => {
      state.categories = action.payload.categories;
      state.unsortedCards = action.payload.unsortedCards;
    })
});
