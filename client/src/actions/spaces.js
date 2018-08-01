import {saveSpace} from "../utils/api";

export const ADD_SPACE = 'ADD_SPACE';
export const REMOVE_SPACE = 'REMOVE_SPACE';
export const RECEIVE_SPACES = 'RECEIVE_SPACES';

function addSpace(space) {
    return {
        type: ADD_SPACE,
        space,
    }
}

function removeSpace(id) {
    return {
        type: REMOVE_SPACE,
        id
    }
}

export function receiveSpaces(spaces) {
    return ({
        type: RECEIVE_SPACES,
        spaces,
    })
}


export function handleAddSpace(space, cb) {
    return (dispatch) => {
        return saveSpace(space).then((response) => {
            dispatch(addSpace(space));
            cb();
        }).catch(() => console.error("Error adding space"))
    }
}