import {combineReducers} from 'redux';

import studyReducer from './studyReducer';
import studyCreationReducer from './studyCreationReducer';
import studyPageReducer from './studyPageReducer';

const app = combineReducers({
  studies: studyReducer,
  studyCreation: studyCreationReducer,
  study: studyPageReducer,
});

export default app;
