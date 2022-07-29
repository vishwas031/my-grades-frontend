import { combineReducers } from 'redux';
import UserReducer from './User/UserReducer';

const rootReducer = combineReducers({
  user: UserReducer
});

export default rootReducer;