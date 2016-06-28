import { combineReducers } from 'redux'

import {
    LOCK_SUCCESS, LOGOUT_SUCCESS,
    QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
} from '../actions/authenticate';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOCK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state
    }
}

// The quotes reducer
export default function quotes(state = {
    isFetching: false,
    quote: '',
    authenticated: false
  }, action) {
  switch (action.type) {
    case QUOTE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case QUOTE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        quote: action.response,
        authenticated: action.authenticated || false
      });
    case QUOTE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state
  }
}

// We combine the reducers here so that they
// can be left split apart above
// const quotesApp = combineReducers({
//   auth,
//   quotes
// });

