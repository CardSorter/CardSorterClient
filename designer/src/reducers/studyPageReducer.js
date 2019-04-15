import * as studyActions from '../actions/studyPageAction';
import * as StatusEnum from '../static/StatusEnum';

/**
 *
 * @param {stateSchema} state
 * @param {studyPageAction} action
 * @return {stateSchema}
 */
export default function studyPageReducer(state={}, action) {
  switch (action.type) {
    case studyActions.LOAD_STUDY: {
      const newState = Object.assign({}, state);
      const study = action.payload.study;
      if (action.payload.status === StatusEnum.SUCCESS) {
        newState.id = study.id;
        newState.title = study.title;
        newState.isLive = study.isLive;
        newState.launched = new Date(study.launched);
        newState.ended = study.ended ? new Date(study.ended): undefined;
        newState.participants = {
          completion: study.participants.completion,
          total: study.participants.total,
          completed: study.participants.completed,
          data: study.participants.data,
        };
        newState.cards = {
          average: study.cards.average,
          total: study.cards.total,
          sorted: study.cards.sorted,
          data: study.cards.data,
        };
        newState.categories = {
          similarity: study.categories.similarity,
          total: study.categories.total,
          similar: study.categories.similar,
          merged: study.categories.merged,
          data: study.categories.data,
        };
      }

      newState.isFetching = action.payload.status !== StatusEnum.SUCCESS;
      return newState;
    }
    case studyActions.CHANGE_VIEW: {
      return Object.assign({}, state, {
        'selectedItem': action.payload.no,
      });
    }
    default: {
      return state;
    }
  };
}
