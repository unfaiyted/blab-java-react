import { getInitialData } from "../utils/api";
import { receiveSpaces } from "./spaces";
import { receiveChannels} from "./channels";
import { receiveUsers } from "./users";
import { setAuthUser } from "./authUser";
import { showLoading, hideLoading} from 'react-redux-loading';
import {checkValidLoginState} from "../utils/security/auth";

//test
export function handleInitialData(AUTHED_ID) {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData(AUTHED_ID).then(({users, spaces, channels}) => {
            dispatch(receiveSpaces(spaces));
            dispatch(receiveChannels(channels));
            dispatch(receiveUsers(users));
            dispatch(hideLoading());

        })
    }
}


export function handleAuthenticatedUser() {
    return (dispatch) => {
        dispatch(showLoading());
        return checkValidLoginState().then((response) => {
            if (response.isAuthenticated !== false) {

                dispatch(setAuthUser(response));
                getInitialData(response.user.id)
                    .then(({users, spaces, channels}) => {
                        dispatch(receiveSpaces(spaces));
                        dispatch(receiveChannels(channels));
                        dispatch(receiveUsers(users));
                    });

                dispatch(hideLoading());

                return (response === false) ? false : true;

            }
        })
    }
}