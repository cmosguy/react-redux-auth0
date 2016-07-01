import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import auth from './auth';

export default combineReducers({
  runtime,
  intl,
  auth,
});
