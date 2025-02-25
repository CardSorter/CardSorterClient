import {HeaderState} from "reducers/headerReducer";
import {StudyCreationState} from "./studyCreationReducer";
import {StudyPageState} from "./studyPageReducer";
import {StudyState} from "./studyReducer";
import {AuthState} from "./authReducer";

export default interface StateSchema {
  auth: AuthState,
  header: HeaderState,
  studies: StudyState,
  studyCreation: StudyCreationState,
  study: StudyPageState,
}