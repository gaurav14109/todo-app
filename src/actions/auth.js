import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_USER, USER_LOADED, REMOVE_TODOS,REGISTER_SUCCESS} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import {getAllTodos} from './todo'
import {setAlert} from './alerts'
export const loadUser = () => async dispatch => {
    if (localStorage.getItem('token')) {

        setAuthToken(localStorage.getItem('token'))
    }

    try {
        const res = await axios.post('http://localhost:5000/api/auth/')

        dispatch({type: USER_LOADED, payload: res.data})
        dispatch(getAllTodos())
    } catch (err) {
        console.log(err)
    }

}
export const userLogin = (data) => async dispatch => {

    const config = {

        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(data)

    try {
        const res = await axios.post(
            'http://localhost:5000/api/auth/login',
            body,
            config
        )

        dispatch({type: REGISTER_SUCCESS, payload: res.data})
        dispatch(loadUser())
    } catch (err) {
        console.log(err)
        const errors = err
            .response
            .data
            .errors
            errors
            .forEach(err => dispatch(setAlert(err.msg, 'danger')))

        dispatch({type: LOGIN_ERROR})
    }
}

export const registerUser = (data) => async dispatch => {

    const config = {

        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(data)

    try {
        const res = await axios.post(
            'http://localhost:5000/api/users/registeration',
            body,
            config
        )

        dispatch({type: LOGIN_SUCCESS, payload: res.data})
        dispatch(loadUser())
    } catch (err) {
        console.log(err)
        const errors = err
            .response
            .data
            .errors
            errors
            .forEach(err => dispatch(setAlert(err.msg, 'danger')))
    }
}

export const userLogout = () => dispatch => {
    dispatch({type: REMOVE_TODOS})
    dispatch({type: LOGOUT_USER})
}
