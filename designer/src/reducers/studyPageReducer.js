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
        newState.launchedDate = new Date(study.launchedDate);
        newState.ended = study.ended ? new Date(study.ended): undefined;
        newState.noParticipants = study.participants === 0 ? true : false;
        newState.participants = {
          completion: study.participants ? study.participants.completion: '0%',
          total: study.participants ? study.participants.total: 0,
          completed: study.participants ? study.participants.completed: 0,
          data: study.participants ? study.participants.data: [],
        };
        newState.cards = {
          average: study.cards ? study.cards.average: '0%',
          total: study.cards ? study.cards.total: 0,
          sorted: study.cards ? study.cards.sorted: 0,
          data: study.cards ? study.cards.data: [],
        };
        newState.categories = {
          similarity: study.categories ? study.categories.similarity: '0%',
          total: study.categories ? study.categories.total: 0,
          similar: study.categories ? study.categories.similar: 0,
          merged: study.categories ? study.categories.merged: 0,
          data: study.categories ? study.categories.data: [],
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
