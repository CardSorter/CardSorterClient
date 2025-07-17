import * as studyActions from '../actions/studyPageAction';
import * as ActionStatus from 'actions/ActionStatus';
import {createReducer} from '@reduxjs/toolkit';
import {SortingDataItem} from "../actions/studyPageAction";
import exportToXLXS from "utils/exportToXLSX";

export interface StudyPageState {
  title: string;
  description: string;
  cards: {
    average: any,
    total: any,
    sorted: any,
    data: {
      name: string,
      categories_no: number,
      category_names: string[],
      frequencies: number[],
      description: string,
    }[],
  };
  participants: {
    completion: any,
    total: any,
    completed: any,
    data: (number | string)[][]; // 0: participant no, 1: time taken, 2: completion rate 3: categories created
  };
  sorting: { data: SortingDataItem[] };
  categories: {
    similarity: any,
    total: any,
    similar: any,
    merged: any,
    data: any[],
  };
  similarityMatrix: any[];
  id?: string;
  isLive?: boolean;
  launchedDate?: Date;
  ended?: Date;
  noParticipants?: boolean;
  isFetching?: boolean;
  clusters?: Record<string, unknown>;
  clustersFetching?: boolean;
  editPopupTitle: any,
  editPopupDescription: any,
  editPopupIsLive: any,
}

const initialState: StudyPageState = {
  title: '',
  description: '',
  cards: {average: null, total: null, sorted: null, data: []},
  participants: {completion: null, total: null, completed: null, data: []},
  sorting: {data: []},
  categories: {similarity: null, total: null, similar: null, merged: null, data: []},
  similarityMatrix: [],
  id: undefined,
  isLive: undefined,
  launchedDate: undefined,
  ended: undefined,
  noParticipants: undefined,
  isFetching: undefined,
  clusters: undefined,
  clustersFetching: undefined,
  editPopupTitle: undefined,
  editPopupDescription: undefined,
  editPopupIsLive: undefined,
};

const studyPageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(studyActions.loadStudy, (state, action) => {
      const study = action.payload?.study;
      if (!study) {
        return;
      }

      if (action.payload?.status === ActionStatus.SUCCESS) {
        state.id = study.id;
        state.title = study.title;
        state.description = study.description;
        state.isLive = study.isLive;
        state.launchedDate = new Date(study.launchedDate);
        state.ended = study.ended ? new Date(study.ended) : undefined;
        state.noParticipants = study.participants === 0;
        if (typeof study.participants !== 'number') {
          state.participants = {
          completion: study.participants.completion || '0%',
          total: study.participants.total || 0,
          completed: study.participants.completed || 0,
          data: study.participants.data || [],
        };
        }
        state.sorting = {data: study.sorting?.data || []};
        state.cards = {
          average: study.cards?.average || '0%',
          total: study.cards?.total || 0,
          sorted: study.cards?.sorted || 0,
          data: study.cards?.data || [],
        };
        state.categories = {
          similarity: study.categories?.similarity || '0%',
          total: study.categories?.total || 0,
          similar: study.categories?.similar || 0,
          merged: study.categories?.merged || 0,
          data: study.categories?.data || [],
        };
        state.similarityMatrix = study.similarityMatrix;
      }
      state.isFetching = action.payload?.status !== ActionStatus.SUCCESS;
    })
    .addCase(studyActions.loadClusters, (state, action) => {
      state.clusters = action.payload?.status === ActionStatus.SUCCESS ? action.payload.clusters : {};
      state.clustersFetching = action.payload?.status !== ActionStatus.SUCCESS;
    })
    .addCase(studyActions.downloadXLSX, (state) => {
      exportToXLXS(state, state.title);
    });
});

export default studyPageReducer;
