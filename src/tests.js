import * as cardActions from './actions/cardAction';
import cards from './staticContent/cards';

/**
 * Basic template population
 * @param {Store} store
 */
function templatePopulate(store) {
  // Add the cards
  for (const card of Object.values(cards)) {
    store.dispatch(cardActions.addCardToContainer(card.id));
  }
  // Create some categories
  store.dispatch(cardActions.createCategory(1, 'Category1', 2));
  store.dispatch(cardActions.removeCardFromContainer(2));
  store.dispatch(cardActions.createCategory(2, 'Category2', 3));
  store.dispatch(cardActions.removeCardFromContainer(3));
  // Add some other cards to the categories
  store.dispatch(cardActions.addCardToCategory(4, 1));
  store.dispatch(cardActions.removeCardFromContainer(4));
}


/**
 *
 * @param {Store} store
 */
export default function runTests(store) {
  // store.dispatch(cardActions.createCategory(32, 'I am a category', 2));
  // store.dispatch(cardActions.createCategory(43, 'Hello', 3));

  // store.dispatch(cardActions.addCardToCategory(6532, 32));
  // store.dispatch(cardActions.removeCardFromCategory(3, 43));

  // store.dispatch(cardActions.addCardToContainer(4));
  // store.dispatch(cardActions.addCardToContainer(3));
  // store.dispatch(cardActions.removeCardFromContainer(4));  
  templatePopulate(store);
}
