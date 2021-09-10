import {LOGIN_SUCCESS, LOGOUT_USER, USER_LOADED,REGISTER_SUCCESS} from '../actions/types';
import decode from 'jwt-decode'
const initialState = {
    user: {},
    error: '',
    loading: true,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    roles: ''
}

export default function user(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            const user = decode(payload.token)
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                
                roles: user.roles
            }
        case LOGOUT_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                token: null,
                user: {},
                roles: ''
            }
        case USER_LOADED:
            
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload, 
                roles:payload.roles
            }
        default:
            return state
    }

}