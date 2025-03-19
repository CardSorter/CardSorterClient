import {HeaderState} from "reducers/headerReducer";
import {StudyCreationState} from "./studyCreationReducer";
import {StudyPageState} from "./studyPageReducer";
import {StudyState} from "./studiesReducer";
import {AuthState} from "./authReducer";
import {LoginState} from "./loginReducer";
import {RegisterState} from "./registerReducer";
import {SortingUIState} from "./sorting/sortingUiReducer";
import {SortingBoardState} from "./sorting/sortingBoardReducer";

interface SortingState {
  board: SortingBoardState;
  ui: SortingUIState;
}

export default interface StateSchema {
  login: LoginState,
  register: RegisterState,
  auth: AuthState,
  header: HeaderState,
  studies: StudyState,
  studyCreation: StudyCreationState,
  study: StudyPageState,
  // Sorting page (/card-sorter/sort) state
  sortingBoard: SortingBoardState,
  sortingUi: SortingUIState,
}