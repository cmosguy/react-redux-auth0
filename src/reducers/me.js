import {
    SET_ME_START,
    SET_ME_SUCCESS,
    SET_ME_ERROR,
} from '../constants'



export default function me(state = null, action) {
    if (state === null) {
        return false;
    }
    
    switch (action.type) {
        case SET_ME_START:
            const me = state[action.payload.me] ? action.payload.me : state.me;
            return {
                ...state,
                me
            };
        case SET_ME_SUCCESS:
            return {
                ...state,
                me: action.payload.me
            };
        case SET_ME_ERROR:
            return {
                ...state
            };
        default:
            return state
    }
}
