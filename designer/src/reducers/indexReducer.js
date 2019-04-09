import {combineReducers} from 'redux';

import studyReducer from './studyReducer';
import studyCreationReducer from './studyCreationReducer';

const app = combineReducers({
  studies: studyReducer,
  studyCreation: studyCreationReducer,
});

export default app;
