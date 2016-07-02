import {CALL_API} from '../middleware/api'

import {
    ME_REQUEST,
    ME_SUCCESS,
    ME_FAILURE
} from '../constants'


export function fetchMe() {
    return {
        [CALL_API]: {
            endpoint: 'me',
            isAuthenticated: true,
            types: [ME_REQUEST, ME_SUCCESS, ME_FAILURE]
        }
    }
}
