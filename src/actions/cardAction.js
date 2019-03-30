import fetch from 'cross-fetch';
import * as responseStatus from '../staticContent/responseStatus';
import {saveStudyID} from './uiAction';
import debugConsole from '../debug/Debugconsole';

export const IMPORT_CARD = 'IMPORT_CARD';
export const ADD_CARD_CATEGORY = 'ADD_CARD_CATEGORY';
export const REMOVE_CARD_CATEGORY = 'REMOVE_CARD_CATEGORY';
export const ADD_CARD_CONTAINER = 'ADD_CARD_CONTAINER';
export const REMOVE_CARD_CONTAINER = 'REMOVE_CARD_CONTAINER';

export const REQUEST_CARDS = 'REQUEST_CARDS';

// Action creators //

/**
 *
 * @param {int} cardID
 * @param {int} categoryID
 * @return {JSON} the action
 */
export function addCardToCategory(cardID, categoryID) {
  return {
    type: ADD_CARD_CATEGORY,
    payload: {
      cardID: cardID,
      categoryID: categoryID,
    },
    error: false,
  };
}

/**
 *
 * @param {int} cardID
 * @param {int} categoryID
 * @return {JSON} the action
 */
export function removeCardFromCategory(cardID, categoryID) {
  return {
    type: REMOVE_CARD_CATEGORY,
    payload: {
      cardID: cardID,
      categoryID: categoryID,
    },
    error: false,
  };
}

/**
 *
 * @param {int} cardID
 * @return {JSON} the action
 */
export function addCardToContainer(cardID) {
  return {
    type: ADD_CARD_CONTAINER,
    payload: {
      cardID: cardID,
    },
    error: false,
  };
}

/**
 *
 * @param {int} cardID
 * @return {JSON} the action
 */
export function removeCardFromContainer(cardID) {
  return {
    type: REMOVE_CARD_CONTAINER,
    payload: {
      cardID: cardID,
    },
    error: false,
  };
}

/**
 *
 * @param {responseStatus} status
 * @param {JSON} response
 * @param {String} error
 * @return {JSON} the action
 */
export function requestCards(status, response, error) {
  return {
    type: REQUEST_CARDS,
    payload: {
      status: status,
      response: response,
      error: error,
    },
  };
}

/* Thunk actions */

/**
 *
 * @param {Number} studyID
 * @return {function}
 */
export function fetchCards(studyID) {
  return function(dispatch) {
    dispatch(saveStudyID(studyID));
    dispatch(requestCards(responseStatus.IS_FETCHING));

    fetch('http://127.0.0.1:5000/sort_endpoint?cards=true&study_id='+studyID)
        .then(
            (response) => response.json().then((json) =>{
              // Load the cards
              dispatch(requestCards(responseStatus.SUCCESS, json));
              // Show the cards
              for (const card of json.cards) {
                dispatch(addCardToContainer(card.id));
              }
            }),
            (error) => debugConsole(error)
        );
  };
}

