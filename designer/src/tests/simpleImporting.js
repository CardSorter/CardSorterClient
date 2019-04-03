import * as studyActions from '../actions/studyAction';
import StudyCard from '../elements/StudyCard';

/**
 * Runs basic UI population
 * @param {Store} store
 */
export function runTests(store) {
  const date1 = new Date();
  date1.setDate(3);
  const date2 = new Date();
  date2.setDate(15);
  date2.setMonth(2);
  const studies = [
    new StudyCard(1, 'Study #1', true, 48, 3, date1, date1, undefined),
    new StudyCard(2, 'Study #2', true, 48, 3, date1, date1, undefined),
    new StudyCard(3, 'Study #3', false, 48, 3, date1, date1, date2),
    new StudyCard(4, 'Study #4', true, 48, 3, date1, date1, undefined),
  ];
  store.dispatch(studyActions.loadStudies(studies));
}
