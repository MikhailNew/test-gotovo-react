// import Axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionsType'

export function auth (token, userId, isLogin) {
    return async dispatch => {
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        dispatch(authSuccess(token))        
    }
}

export function autoLogin () {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
        }
    }
}

export function authSuccess (token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout (time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return {
        type: AUTH_LOGOUT
    }
}