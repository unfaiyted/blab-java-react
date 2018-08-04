import { isObject } from './helpers'

export const BASE_URL = 'http://localhost:8080/';


function handleError(error) {
    console.warn(error);
    return null;
}

// GET DATA
async function getUsers() {
    const response = await fetch(BASE_URL + 'users/list', {
        method: 'GET',
        credentials: 'include', //
        agent: null,
        headers: {
            "Content-Type": "text/plain",
            'Authorization': 'Basic ' + btoa('username:password'),
        },
        timeout: 5000
    });
    return response.json();
}

async function getChannels(userId) {
    const response = await fetch(BASE_URL + 'channels/user/' + userId, {
        method: 'GET',
        credentials: 'include', //
        agent: null,
        headers: {
            "Content-Type": "text/plain",
            'Authorization': 'Basic ' + btoa('username:password'),
        },
        timeout: 5000
    });
    return response.json();
}



 async function getChannelsByOwnerId(ownerId) {
    const response = await fetch(BASE_URL + 'channels/list/' + ownerId);
    return response.json();
}

async function getChannelsBySpace(spaceId) {
    const response = await fetch(BASE_URL + 'channels/space/' + spaceId );
    return response.json();
}

async function getSpaces(userId) {
    const response = await fetch(BASE_URL + 'spaces/member/' + userId, {
        method: 'GET',
        credentials: 'include', //
        agent: null,
        headers: {
            "Content-Type": "text/plain",
            'Authorization': 'Basic ' + btoa('username:password'),
        },
        timeout: 5000
    });
    return response.json();
}

async function getSpacesByUser(userId) {
    const response = await fetch(BASE_URL + 'spaces/user/' + userId);
    return response.json();
}


export async function getMessages(channelId) {
    const response = await fetch(BASE_URL + 'messages/channel/' + channelId, {
        method: 'GET',
        credentials: 'include', //
        agent: null,
        headers: {
            "Content-Type": "text/plain",
            'Authorization': 'Basic ' + btoa('username:password'),
        },
        timeout: 5000
    });
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

export async function saveMessage(message) {
    const response = await fetch(BASE_URL + 'channels/add');
    return response.json();
}

export function getInitialData (userId) {
    return Promise.all([
        getUsers(),
        getSpaces(userId),
        getChannels(userId),
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


