import {combineReducers} from 'redux';

import loginReducer from './loginReducer';

const app = combineReducers({
  auth: loginReducer,
});

export default app;