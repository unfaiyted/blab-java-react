import {
    ADD_MESSAGE,
    REMOVE_MESSAGE,
    RECEIVE_MESSAGES,
} from "../actions/messages";


export default function messages(state= {}, action) {
    switch(action.type) {
        case ADD_MESSAGE:
            return state.concat([action.message]);
        case REMOVE_MESSAGE:
            return state.filter((message) => message.id !== action.id);
        case RECEIVE_MESSAGES:
            return {
                ...state,
                ...action.messages
            }
        default:
            return state;
    }
}