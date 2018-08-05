import { authHeader } from "./security/headers";

export const BASE_URL = 'http://localhost:8080/';


const PARAMS = {
    method: 'GET',
    credentials: 'include',
    headers: authHeader(),
};

function handleError(error) {
    console.warn(error);
    return null;
}

// GET DATA
async function getUsers() {
    const response = await fetch(BASE_URL + 'users/list', PARAMS);
    return response.json();
}

async function getChannels(userId) {
    const response = await fetch(BASE_URL + 'channels/user/' + userId, PARAMS);
    return response.json();
}



 async function getChannelsByOwnerId(ownerId) {
    const response = await fetch(BASE_URL + 'channels/list/' + ownerId);
    return response.json();
}

async function getChannelsBySpace(spaceId) {
    const response = await fetch(BASE_URL + 'channels/space/' + spaceId  );
    return response.json();
}

async function getSpaces(userId) {
    const response = await fetch(BASE_URL + 'spaces/member/' + userId,PARAMS);
    return response.json();
}

async function getSpacesByUser(userId) {
    const response = await fetch(BASE_URL + 'spaces/user/' + userId);
    return response.json();
}


export async function getMessages(channelId, auth_token) {
    const response = await fetch(BASE_URL + 'messages/channel/' + channelId, PARAMS);
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



export async function  getInitialData (userId) {
    return await Promise.all([
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


