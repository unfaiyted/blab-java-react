import { showLoading, hideLoading} from 'react-redux-loading';
import { login } from "../utils/auth";

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER';

export function setAuthUser({isAuthenticated, user}) {
    return {
        type: SET_AUTHED_USER,
        isAuthenticated,
        user,
    }
}

export function logoutAuthedUser() {
    return {
        type: LOGOUT_AUTHED_USER
    }
}


export function handleAuthData() {
    return (dispatch) => {
        dispatch(showLoading());
        return login().then((response) => {
            dispatch(setAuthUser(response));
            dispatch(hideLoading());
        })
    }
}