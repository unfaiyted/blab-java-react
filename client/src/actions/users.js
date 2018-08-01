export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

function removeUser(id) {
    return {
        type: REMOVE_USER,
        id
    }
}

export function receiveUsers(users) {
    return ({
        type: RECEIVE_USERS,
        users,
    })
}

export function handleAddUser(user, cb) {
    return (dispatch) => {

    }
}

export function handleDeleteUser(user) {

}