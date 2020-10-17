/**
 * Data model representing the card
 */
export default class Card {
  /**
   *
   * @param {int} id
   * @param {string} title
   * @param {string} description
   */
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
