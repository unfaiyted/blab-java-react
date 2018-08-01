import { isObject } from './helpers'

const BASE_URL = 'http://localhost:8080/';


function handleError(error) {
    console.warn(error);
    return null;
}

// GET DATA
async function getUsers() {
    const response = await fetch(BASE_URL + 'users/list');
    return response.json();
}

async function getChannels() {
    const response = await fetch(BASE_URL + 'channels/list');
    return response.json();
}

async function getChannelsBySpace(spaceId) {
    const response = await fetch(BASE_URL + 'channels/space/' + spaceId );
    return response.json();
}

async function getSpaces() {
    const response = await fetch(BASE_URL + 'spaces/list');
    return response.json();

}

async function getSpacesByUser(userId) {
    const response = await fetch(BASE_URL + 'spaces/user/' + userId);
    return response.json();
}

export async function saveSpace(space) {
    const response  = await fetch(BASE_URL + 'spaces/add');
    return response.json();
}

export async function saveChannel(channel) {
    const response = await fetch(BASE_URL + 'channels/add');
    return response.json();
}

export function getInitialData () {
    return Promise.all([
        getUsers(),
        getSpaces(),
        getChannels(),
    ]).then(([
        users,
        spaces,
        channels
    ]) => ({
        users,
        spaces,
        channels
    }));

}


