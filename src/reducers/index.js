import { combineReducers } from 'redux';
import runtime from './runtime';
import { auth, quotes } from './authenticate';

export default combineReducers({
  runtime,
  auth,
  quotes
});
