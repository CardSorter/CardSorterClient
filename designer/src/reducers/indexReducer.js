import {combineReducers} from 'redux';

import headerReducer from './headerReducer';
import studyReducer from './studyReducer';
import studyCreationReducer from './studyCreationReducer';
import studyPageReducer from './studyPageReducer';
import authReducer from "./authReducer";

const app = combineReducers({
  auth: authReducer,
  header: headerReducer,
  studies: studyReducer,
  studyCreation: studyCreationReducer,
  study: studyPageReducer,
});

export default app;
