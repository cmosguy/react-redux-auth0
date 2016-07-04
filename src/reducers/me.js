import {
    SET_ME_START,
    SET_ME_SUCCESS,
    SET_ME_ERROR,
} from '../constants'



export defaault function me(state = null, action) {
    if (state === null) {
        return false;
    }
    
    switch (action.type) {
        case SET_ME_START:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ME_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                quote: action.response,
                isAuthenticated: action.authenticated || false
            });
        case ME_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state
    }
}
