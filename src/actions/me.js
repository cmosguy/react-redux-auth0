import fetch from '../core/fetch';
import {
    SET_ME_START,
    SET_ME_SUCCESS,
    SET_ME_ERROR,
    BASE_URL
} from '../constants';

export function setMe({me}) {
    return async(dispatch) => {
        dispatch({
            type: SET_ME_START,
            me
        });

        try {
            const token = localStorage.getItem('id_token');
            console.log('about to fetch /me');
            const resp = await fetch(BASE_URL + '/me', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });
            if (resp.status !== 200) throw new Error(resp.statusText);
            const {data} = await resp.json();
            dispatch({
                type: SET_ME_SUCCESS,
                me: {
                    data
                }
            });

        } catch (error) {
            dispatch({
                type: SET_ME_ERROR,
                me: {
                    me,
                    error
                }
            });
            return false;
        }

        return true;
    };
}
