import {
    ADD_USER,
    REMOVE_USER,
    RECEIVE_USERS
} from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case ADD_USER:
            return state.concat([action.user]);
        case REMOVE_USER:
            return state.filter((user) => user.id !== action.id);
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            }
        default:
            return state;
    }
}