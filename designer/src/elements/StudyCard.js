
/**
 * Represents the data model of the study-card object, found in the main page
 */
export default class StudyCard {
  /**
   *
   * @param {Number} id
   * @param {String} title
   * @param {Boolean} isLive
   * @param {Number} completedNo
   * @param {Number} abandonedNo
   * @param {Date} launchedDate
   * @param {Date} editDate
   * @param {Date} endDate
   */
  constructor(id, title, isLive, completedNo, abandonedNo,
      launchedDate, editDate, endDate) {
    this.id = id;
    this.title = title;
    this.isLive = isLive;
    this.completedNo = completedNo;
    this.abandonedNo = abandonedNo;
    this.launchedDate = launchedDate;
    this.editDate = editDate;
    this.endDate = endDate;
  }
}
