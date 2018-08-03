import { SET_AUTHED_USER, LOGOUT_AUTHED_USER} from "../actions/authUser";

export default function authedUser (state = null, action) {
    const { isAuthenticated, user } = action;
    switch (action.type) {
        case SET_AUTHED_USER:
            return {
                isAuthenticated,
                user,
                };
        case LOGOUT_AUTHED_USER:
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }
}