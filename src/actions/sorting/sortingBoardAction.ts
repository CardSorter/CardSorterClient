import {createAction} from '@reduxjs/toolkit';
import {SortingCard, SortingCategory} from "reducers/sorting/sortingBoardReducer";

export interface SortingRequestCardResponse {
  cards: SortingCard[];
  title: string;
  description: string;
}
export interface CategoryType {
  id: number;
  title: string;
  cards: number[];
}


export const toggleDescription = createAction<{ cardID: number }>("sortingBoard/toggleDescription");
export const addCardToCategory = createAction<{ cardID: number; categoryID: number }>("sortingBoard/addCardToCategory");
export const removeCardFromCategory = createAction<{ cardID: number; categoryID: number; preserve?: boolean  }>("sortingBoard/removeCardFromCategory");
export const createCategory = createAction<{ categoryID?: number; cardID: number }>("sortingBoard/createCategory");
export const removeCategory = createAction<{ categoryID: number }>("sortingBoard/removeCategory");
export const renameCategory = createAction<{ categoryID: number; title: string }>("sortingBoard/renameCategory");
export const minimizeCategory = createAction<{ id: number }>("sortingBoard/minimizeCategory");
export const toggleNotFound = createAction("sortingBoard/toggleNotFound");
export const clearState = createAction("ui/clearState");
export const loadCategories = createAction<{ categories: SortingCategory[] }>('sortingBoard/loadCategories');


export const loadSavedState = createAction<{
  categories: Record<number, SortingCategory>;
  unsortedCards: SortingCard[];
}>("sortingBoard/loadSavedState");

export const requestCards = createAction<{
  status: string;
  response?: SortingRequestCardResponse;
}>("sortingBoard/requestCards");

