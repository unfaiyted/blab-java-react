import { showLoading, hideLoading} from 'react-redux-loading';
import { login } from "../utils/security/auth";

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const SET_AUTHED_ERROR = 'SET_AUTHED_ERROR';
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER';

export function setAuthUser({isAuthenticated, user, oAuth}) {
    return {
        type: SET_AUTHED_USER,
        isAuthenticated,
        user,
        oAuth,
    }
}

export function setAuthError(error) {
    return {
        type: SET_AUTHED_ERROR,
        error
    }
}

export function logoutAuthedUser() {
    localStorage.clear(); // reset user logout
    return {
        type: LOGOUT_AUTHED_USER
    }
}


export function handleAuthData(username, password) {


    return (dispatch) => {
        dispatch(showLoading());
        return login(username, password).then((response) => {
            dispatch(setAuthUser(response));
            dispatch(hideLoading());
        })
    }
}