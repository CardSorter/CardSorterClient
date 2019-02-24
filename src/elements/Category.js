export default class Category {
  /**
   *
   * @param {String} title
   */
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.cards = [];
  }
  
  /**
   *
   * @param {int} cardId
   */
  addCard(cardId) {
    this.cards.push(cardId);
  }
}