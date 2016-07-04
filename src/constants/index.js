// Please use suffixes START, SUCCESS and ERROR for asynchronous actions only.
// You might want to use https://www.npmjs.com/package/react-redux-loading-bar
// and not using this actions in pair can break this nice utility

export const BASE_URL = 'https://auth0-redux-react.adamklein.io/api';
// export const BASE_URL = 'http://auth0example.dev/api';

export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';

// async action
export const SET_LOCALE_START = 'SET_LOCALE_START';
export const SET_LOCALE_SUCCESS = 'SET_LOCALE_SUCCESS';
export const SET_LOCALE_ERROR = 'SET_LOCALE_ERROR';

// we do not want to show working indicator in this case
export const AUTH0_SHOW = 'AUTH0_SHOW';
export const AUTH0_OK = 'AUTH0_OK';
export const AUTH0_ERR = 'AUTH0_ERR';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const SET_ME_START = 'SET_ME_START';
export const SET_ME_SUCCESS = 'SET_ME_SUCCESS';
export const SET_ME_ERROR = 'SET_ME_ERROR';

