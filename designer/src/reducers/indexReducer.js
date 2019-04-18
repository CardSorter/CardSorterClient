import {combineReducers} from 'redux';

import headerReducer from './headerReducer';
import studyReducer from './studyReducer';
import studyCreationReducer from './studyCreationReducer';
import studyPageReducer from './studyPageReducer';

const app = combineReducers({
  header: headerReducer,
  studies: studyReducer,
  studyCreation: studyCreationReducer,
  study: studyPageReducer,
});

export default app;
