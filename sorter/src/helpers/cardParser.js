import cards from '../staticContent/cards';

/**
 * Parses the card's id and returns the real objects
 * @param {cardID[]} cardIDs
 * @return {card[]} the corresponding objects
 */
export default function parseCards(cardIDs) {
  // Add the card item based on it's id
  const cardsArr = [];
  for (const cardID of cardIDs) {
    cardsArr.push(cards[cardID]);
  }
  return {
    cards: cardsArr,
  };
}
