import { isObject } from './helpers'

import headers from './security/headers'

export const BASE_URL = 'http://localhost:8080/';

function handleError(error) {
    console.warn(error);
    return null;
}

// GET DATA
async function getUsers(auth_token) {
    const response = await fetch(BASE_URL + 'users/list' + `?access_token=${auth_token}`, {
        method: 'GET',
        credentials: 'include', //
        agent: null,
        headers,
        timeout: 5000
    });
    return response.json();
}

async function getChannels(userId, auth_token) {
    const response = await fetch(BASE_URL + 'channels/user/' + userId + `?access_token=${auth_token}`, {
        method: 'GET',
        credentials: 'include', //
        agent: null,
        headers,
        timeout: 5000
    });
    return response.json();
}



 async function getChannelsByOwnerId(ownerId, auth_token) {
    const response = await fetch(BASE_URL + 'channels/list/' + ownerId + `?access_token=${auth_token}`);
    return response.json();
}

async function getChannelsBySpace(spaceId, auth_token) {
    const response = await fetch(BASE_URL + 'channels/space/' + spaceId + `?access_token=${auth_token}` );
    return response.json();
}

async function getSpaces(userId, auth_token) {
    const response = await fetch(BASE_URL + 'spaces/member/' + userId + `?access_token=${auth_token}`, {
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


export async function getMessages(channelId, auth_token) {
    const response = await fetch(BASE_URL + 'messages/channel/' + channelId + `?access_token=${auth_token}`, {
        method: 'GET',
        credentials: 'include', //
        agent: null
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

export function getInitialData (userId, TOKEN) {
    return Promise.all([
        getUsers(TOKEN),
        getSpaces(userId, TOKEN),
        getChannels(userId, TOKEN),
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


