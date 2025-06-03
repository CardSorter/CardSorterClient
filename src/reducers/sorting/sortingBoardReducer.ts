import {createReducer} from '@reduxjs/toolkit';
import * as sortingBoardAction from 'actions/sorting/sortingBoardAction';
import { loadCategories } from 'actions/sorting/sortingBoardAction';

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
  predefined: boolean;
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
      // Description is always visible if the card is unsorted
      

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
      const card = state.unsortedCards.find((card) => card.id === action.payload.cardID);

      
      if (card) {
        state.categories[id] = {id: id, cards: [card], predefined: false,};
        // Remove the added card from the unsorted list
        state.unsortedCards = state.unsortedCards.filter((card) => card.id !== action.payload.cardID);
      }else{
        state.categories[id] = {id: id, cards: [], predefined: false,};

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

        // Remove card from the unsorted list
        state.unsortedCards = state.unsortedCards.filter((card) => card.id !== cardID);
      }
    })
    .addCase(sortingBoardAction.removeCardFromCategory, (state, action) => {
      const cardID = action.payload.cardID;
      const categoryID = action.payload.categoryID;
    
      const card = state.categories[categoryID].cards.find((card) => card.id === cardID);
      if (card) {
        // Remove card from category
        state.categories[categoryID].cards = state.categories[categoryID].cards.filter((card) => card.id !== cardID);
        state.unsortedCards.push(card);
    
        // Remove empty non-predefined categories
        const category = state.categories[categoryID];
        if (
          category.cards.length === 0 &&
          !category.predefined &&
          !action.payload.preserve
        ) {
          delete state.categories[categoryID];
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
    .addCase(loadCategories, (state, action) => {
      state.categories = {};
      action.payload.categories.forEach((cat) => {
        state.categories[cat.id] = {
          id: cat.id,
          title: cat.title,
          cards: cat.cards || [],
          isMinimized: false,
          predefined: true,
        };
      });
    })
    
});
