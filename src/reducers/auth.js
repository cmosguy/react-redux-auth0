import {
  LOCK_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/authenticate';

function getInitialState() {
  let isAuthenticated = false;
  if (process.env.BROWSER) {
    // NOTE: Using different state in browser when mounting component can trigger React warning:
    // "React attempted to reuse markup in a container but the checksum was invalid"
    // Possible solution is dispatch some special action after first render on client.
    if (typeof localStorage !== 'undefined') {
      isAuthenticated = !!localStorage.getItem('id_token');
    }
  }
  return {
    isFetching: false,
    isAuthenticated,
  };
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = getInitialState(), action) {
  switch (action.type) {
    case LOCK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    }

    default: {
      return state;
    }
  }
}
