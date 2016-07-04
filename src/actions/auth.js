import {
    AUTH0_SHOW,
    AUTH0_OK,
    AUTH0_ERR,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    // LOGOUT_ERROR,
    BASE_URL
} from '../constants';

export function authOk({token, profile}) {
    return {
        type: AUTH0_OK,
        payload: {
            token,
            profile
        },
    };
}

// Client only: load token and profile after initial render
export function loadToken() {
    if (typeof localStorage !== 'undefined') {
        const token   = localStorage.getItem('id_token');
        const profile = JSON.parse(localStorage.getItem('profile'));

        return authOk({
            token,
            profile
        });
    }
    
    // can this happens?
    return null;
}

// Client only: Opens the Lock widget and dispatches actions along the way
export function login() {
    // code splitting
    return (dispatch, getState) => {
        require.ensure(['auth0-lock'], require => {
            const Auth0Lock = require('auth0-lock');

            const lock        = new Auth0Lock('xXqbQWihvgXtIECPF6nPzFqWWnfgNOAs', 'adamklein.auth0.com');
            const state       = getState();
            const dict        = (state.intl.locale || 'en').match(/^\w+/)[0];
            const lockOptions = {
                dict,
                authParams: {
                    scope: 'openid name email user_metadata app_metadata picture'
                }
            };
            dispatch({type: AUTH0_SHOW});
            lock.show(lockOptions, (error, profile, maybeToken) => {
                if (error) {
                    dispatch({
                        type: AUTH0_ERR,
                        error,
                        payload: {
                            errorMessage: (error && error.message) || 'Error',
                        },
                    });
                } else {
                    const token = maybeToken || profile.idToken;
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', token);
                    }
                    // remember locale for every new request
                    const maxAge    = 3650 * 24 * 3600; // 10 years in seconds
                    document.cookie = `auth0=${token};path=/;max-age=${maxAge};`;
                    dispatch(authOk({
                        token,
                        profile,
                    }));
                }
            });
        });
    };
}

// Logs the user out
export function logout() {
    return dispatch => {
        dispatch({type: LOGOUT_START});
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('id_token');
            localStorage.removeItem('profile');
            document.cookie = 'auth0=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
        // TODO: clean session
        dispatch({type: LOGOUT_SUCCESS});
    };
}
