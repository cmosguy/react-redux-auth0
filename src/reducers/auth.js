import {
  AUTH0_SHOW,
  AUTH0_OK,
  AUTH0_ERR,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from '../constants';

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
    profile: null,
    isAuthenticated,
  };
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = getInitialState(), action) {
  switch (action.type) {
    case AUTH0_SHOW: {
      return {
        ...state,
        isFetching: true, // really? Nothing is fetched here...
        errorMessage: '',
      };
    }

    case AUTH0_OK: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        profile: action.payload.profile,
        errorMessage: '',
      };
    }

    case AUTH0_ERR: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    }

    case LOGOUT_START: {
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: '',
      };
    }

    default: {
      return state;
    }
  }
}
