import {
  AUTH0_SHOW,
  AUTH0_OK,
  AUTH0_ERR,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  // LOGOUT_ERROR,
} from '../constants';

// Opens the Lock widget and
// dispatches actions along the way
export function login() {
  // code splitting
  return (dispatch, getState) => {
    require.ensure(['auth0-lock'], require => {
      const Auth0Lock = require('auth0-lock');

      const lock = new Auth0Lock('xXqbQWihvgXtIECPF6nPzFqWWnfgNOAs', 'adamklein.auth0.com');
      const state = getState();
      const dict = (state.intl.locale || 'en').match(/^\w+/)[0];
      const lockOptions = {
        dict,
      };
      dispatch({ type: AUTH0_SHOW });
      lock.show(lockOptions, (error, profile, token) => {
        if (error) {
          dispatch({
            type: AUTH0_ERR,
            error,
            payload: {
              errorMessage: (error && error.message) || 'Error',
            },
          });
        } else {
          if (process.env.BROWSER) {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('profile', JSON.stringify(profile));
              localStorage.setItem('id_token', token);
            }
            // remember locale for every new request
            const maxAge = 3650 * 24 * 3600; // 10 years in seconds
            document.cookie = `auth0=${token};path=/;max-age=${maxAge}`;
          }
          dispatch({
            type: AUTH0_OK,
            payload: {
              profile,
              token,
            },
          });
        }
      });
    });
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch({ type: LOGOUT_START });
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
    }
    // TODO: clean session
    dispatch({ type: LOGOUT_SUCCESS });
  };
}
