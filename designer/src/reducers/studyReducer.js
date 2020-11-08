import * as studyActions from '../actions/studyAction';
import StudyCard from '../elements/StudyCard';
import * as StatusEnum from '../static/StatusEnum';

/**
 *
 * @param {boardState} state
 * @param {cardActions} action
 * @return {boardState}
 */
export default function studyReducer(state={}, action) {
  switch (action.type) {
    case studyActions.LOAD_STUDIES: {
      const newState = Object.assign({}, state);

      if (action.payload.status === StatusEnum.SUCCESS) {
        if (!action.payload.studies || action.payload.studies.length === 0) {
          newState.studies = [];
        } else {
          newState.studies = action.payload.studies.map(
              ({id, title, isLive, completedNo, abandonedNo,
                launchedDate, editDate, endDate}) => new StudyCard(
                  id, title, isLive, completedNo, abandonedNo,
                  new Date(launchedDate),
                  new Date(editDate),
                  !isLive? new Date(endDate) : undefined
              )
          );
        };
      }
      newState.isFetching = action.payload.status !== StatusEnum.SUCCESS;
      // Sort the studies based on their edit date
      newState.studies.sort((study1, study2) => {
        return study2.editDate - study1.editDate;
      });
      return newState;
    }
    case studyActions.ADD_STUDY: {
      const newState = Object.assign({}, state);
      const study = action.payload.study;

      newState.studies.push(new StudyCard(
          study.id, study.title, study.isLive, study.completedNo,
          study.abandonedNo,
          new Date(study.launchedDate),
          new Date(study.editDate),
          undefined));
      return newState;
    }
    default: {
      return state;
    }
  }
}
