import {combineReducers} from 'redux';

import loginReducer from './loginReducer';
import registerReducer from './registerReducer';

const app = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export default app;
