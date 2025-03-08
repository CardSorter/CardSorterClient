import {HeaderState} from "reducers/headerReducer";
import {StudyCreationState} from "./studyCreationReducer";
import {StudyPageState} from "./studyPageReducer";
import {StudyState} from "./studiesReducer";
import {AuthState} from "./authReducer";
import {LoginState} from "./loginReducer";
import {RegisterState} from "./registerReducer";

export default interface StateSchema {
  login: LoginState,
  register: RegisterState,
  auth: AuthState,
  header: HeaderState,
  studies: StudyState,
  studyCreation: StudyCreationState,
  study: StudyPageState,
}