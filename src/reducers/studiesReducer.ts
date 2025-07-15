import {createReducer} from '@reduxjs/toolkit';
import * as studyActions from '../actions/studiesAction';
import * as ActionStatus from 'actions/ActionStatus';

export type StudyFilters = "all" | "active" | "inactive";

export interface Study {
  id: string;
  title: string;
  isLive: boolean;
  description?: string;
  completedNo: number;
  abandonedNo: number;
  launchedDate: Date;
  editDate: Date;
  endDate?: Date;
}

export interface StudyState {
  studies?: Study[];
  isFetching?: boolean;
  didInvalidate: any,
  filteredBy: StudyFilters;
  searchTerm: string;
  sortOption: string;

}

const initialState: StudyState = {
  studies: [],
  isFetching: false,
  didInvalidate: false,
  filteredBy: "all",
  searchTerm: "",
  sortOption: "editDateDesc",

};

const studiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(studyActions.loadStudies, (state, action) => {
      if (action.payload.status === ActionStatus.SUCCESS) {
        if (!action.payload.studies || action.payload.studies.length === 0) {
          state.studies = [];
        } else {
          state.studies = action.payload.studies.map(
            // TODO: To be typed with studyAction.ts:loadstudies()
            // @ts-ignore
            ({id, title, isLive, description, completedNo, abandonedNo, launchedDate, editDate, endDate}) => ({
              id: id,
              title: title,
              isLive: isLive,
              completedNo: completedNo,
              abandonedNo: abandonedNo,
              launchedDate: new Date(launchedDate),
              editDate: new Date(editDate),
              endDate: !isLive ? new Date(endDate) : undefined,
            })
          );
        }
      }
      
      state.isFetching = action.payload.status !== ActionStatus.SUCCESS;
      state.studies?.sort((a, b) => b.editDate.getTime() - a.editDate.getTime());

    })
    .addCase(studyActions.addStudy, (state, action) => {
      const study = action.payload.study;
      if (study) {
        state.studies?.push({
          id: study.id,
          title: study.title,
          isLive: study.isLive,
          completedNo: study.completedNo,
          abandonedNo: study.abandonedNo,
          launchedDate: new Date(study.launchedDate),
          editDate: new Date(study.editDate),
        });
      }
    })
    .addCase(studyActions.setStudyFilter, (state, action) => {
      state.filteredBy = action.payload.filter;
    })
    
    .addCase(studyActions.setSearchTerm, (state, action) => {
      state.searchTerm = action.payload;
    })
    .addCase(studyActions.setSortOption, (state, action) => {
      state.sortOption = action.payload;
    });
    
});

export default studiesReducer;
