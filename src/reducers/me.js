import {
    ME_REQUEST,
    ME_SUCCESS,
    ME_FAILURE
} from '../constants'



function me(state = {
    isFetching: false,
    quote: '',
    isAuthenticated: false
}, action) {
    switch (action.type) {
        case ME_REQUEST:
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
