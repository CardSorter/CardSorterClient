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
                new Date(launcedDate),
                new Date(editDate),
                new Date(endDate)
            )
        ),
      });
    }
    case studyActions.ADD_STUDY: {
      const newState = Object.assign({}, state);
      console.log(action.payload.study);
      const study = action.payload.study;

      newState.studies.push(new StudyCard(
          study.id, study.title, study.isLive, study.completedNo,
          study.abandonedNo,
          new Date(study.launcedDate),
          new Date(study.editDate),
          undefined));
      return newState;
    }
    default: {
      return state;
    }
  }
}
