import * as cardActions from './actions/cardAction';
import cards from './staticContent/cards';

/**
 * Basic template population
 * @param {Store} store
 */
function templatePopulate(store) {
  for (const card of Object.values(cards)) {
    store.dispatch(cardActions.addCardToContainer(card.id));
  }
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
