import {combineReducers} from 'redux';

import studyReducer from './studyReducer';

const app = combineReducers({
  studies: studyReducer,
});

export default app;
