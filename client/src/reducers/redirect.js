import {
    SET_REDIRECT
} from "../actions/redirect";



export default function redirects(state = {}, action) {
    switch(action.type) {
        case SET_REDIRECT:
            return {
                ...state,
                currentUrl: action.currentUrl
            }
        default:
            return state;
    }
}