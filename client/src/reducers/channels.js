import {
    ADD_CHANNEL,
    REMOVE_CHANNEL,
    RECEIVE_CHANNELS
} from "../actions/channels";


export default function channels(state = {}, action) {
    switch(action.type) {
        case ADD_CHANNEL:
            return state.concat([action.channel]);
        case REMOVE_CHANNEL:
            return state.filter((channel) => channel.id !== action.id);
        case RECEIVE_CHANNELS:
            return {
                ...state,
                ...action.channels
            }
        default:
            return state;
    }

}