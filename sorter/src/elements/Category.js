/**
 * Represents the data model of the category
 */
export default class Category {
  /**
   *
   * @param {int} id
   * @param {String} title
   */
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.cards = [];
    this.isMinimized = false;
  }

  /**
   *
   * @param {int} cardId
   */
  addCard(cardId) {
    this.cards.push(cardId);
  }

  /**
   *
   * @param {int} cardId
   */
  removeCard(cardId) {
    this.cards = this.cards.filter((id)=> {
      return id !== cardId;
    });
  }
}
