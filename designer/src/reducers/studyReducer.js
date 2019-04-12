import * as studyActions from '../actions/studyAction';
import StudyCard from '../elements/StudyCard';

/**
 *
 * @param {boardState} state
 * @param {cardActions} action
 * @return {boardState}
 */
export default function studyReducer(state={}, action) {
  switch (action.type) {
    case studyActions.LOAD_STUDIES: {
      return Object.assign({}, state, {
        'studies': action.payload.studies.map(
            ({id, title, isLive, completedNo, abandonedNo,
              launcedDate, editDate, endDate}) => new StudyCard(
                id, title, isLive, completedNo, abandonedNo,
                new Date(launcedDate.replace(/"/g, '')),
                new Date(editDate.replace(/"/g, '')),
                new Date(endDate.replace(/"/g, ''))
            )
        ),
      });
    }
    default: {
      return state;
    }
  }
}
