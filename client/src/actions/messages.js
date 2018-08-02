import {connect}  from 'react';
import {saveMessage, getMessages} from "../utils/api";
import { showLoading, hideLoading} from 'react-redux-loading';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';


function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        message
    }
}

function removeMessage(id) {
    return {
        type: REMOVE_MESSAGE,
        id,
    }
}

export function receiveMessages(messages) {
    return {
        type: RECEIVE_MESSAGES,
        messages,
    }
}

export function handleMessageData(channelId) {
    return (dispatch) => {
        dispatch(showLoading());
        return(getMessages(channelId)).then((messages) => {
            dispatch(receiveMessages(messages));
            dispatch(hideLoading());
        })
    }
}

function handleAddMessage(message, cb) {
    return (dispatch) => {
        return saveMessage(message).then((response) => {
            dispatch(addMessage(message));
            cb();
        }).catch(()=> console.error("Error adding message"));
    }
}