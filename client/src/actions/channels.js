import {saveChannel} from "../utils/api";

export const ADD_CHANNEL = 'ADD_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

function addChannel(channel) {
    return {
        type: ADD_CHANNEL,
        channel
    }
}

function removeChannel(id) {
    return {
        type: REMOVE_CHANNEL,
        id
    }
}

export function receiveChannels(channels) {
    return {
        type: RECEIVE_CHANNELS,
        channels,
    }
}


function handleAddChannel(channel, cb) {
    return (dispatch) => {
        return saveChannel(channel).then((response) => {
            dispatch(addChannel(channel));
            cb();
        }).catch(() => console.error("Error adding channel"))

    }
}