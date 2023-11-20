import fetch from 'cross-fetch';
import * as responseStatus from '../staticContent/responseStatus';
import {saveStudyID, toogleOnBoarding, addTitleDescription} from './uiAction';
import debugConsole from '../debug/Debugconsole';
import api from './api';

export const TOGGLE_DESCRIPTION = 'TOGGLE_DESCRIPTION';
export const IMPORT_CARD = 'IMPORT_CARD';
export const ADD_CARD_CATEGORY = 'ADD_CARD_CATEGORY';
export const REMOVE_CARD_CATEGORY = 'REMOVE_CARD_CATEGORY';
export const ADD_CARD_CONTAINER = 'ADD_CARD_CONTAINER';
export const REMOVE_CARD_CONTAINER = 'REMOVE_CARD_CONTAINER';

export const REQUEST_CARDS = 'REQUEST_CARDS';

/**
 * Toggles the description of a specified card
 * @param {int} cardID the id of the card that the description will be toggled
 * @return {JSON} the action
 */
export function toggleDescription(cardID) {
  return {
    type: TOGGLE_DESCRIPTION,
    payload: {
      cardID: cardID,
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

    fetch(api+'/sort_endpoint?cards=true&study_id='+studyID)
        .then(
            (response) => response.json().then((json) =>{
              if (response.status === 404) {
                dispatch(requestCards(responseStatus.SUCCESS,
                    undefined, json.error));
                return;
              }
              // Load the cards
              dispatch(requestCards(responseStatus.SUCCESS, json));
              dispatch(addTitleDescription(json.title,json.description))

              // Show the cards
              for (const card of json.cards) {
                dispatch(addCardToContainer(card.id));
              }
              // Show the onboarding screen
              dispatch(toogleOnBoarding(true));
            }),
            (error) => debugConsole(error)
        );
  };
}

