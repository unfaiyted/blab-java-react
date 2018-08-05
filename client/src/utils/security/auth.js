import { BASE_URL } from "../api";
import axios from 'axios';
import headers from './headers'

export const CLIENT_ID = 'blab-client';
export const CLIENT_SECRET = 'blab-secret';


//he authorization endpoint
const OAUTH_AUTHORIZE = 'oauth/authorize';
//the token endpoint, creates
const OAUTH_TOKEN = 'oauth/token';
//errors
const OAUTH_ERROR = 'oauth/error';
//used by Resource Servers to decode access tokens
const OAUTH_CHECK = 'oauth/check_token';
//exposes public key for token verification if using JWT tokens
const OAUTH_KEY = 'oauth/token_key';

async function logout() {
}


async function getToken(username, password) {

        let data = new FormData();

        data.append("grant_type", "password");
        data.append("password",  password);
        data.append("username",  username);
        data.append("client_id", CLIENT_ID);
        data.append("client_secret", CLIENT_SECRET);

    const response = await fetch(
        BASE_URL + OAUTH_TOKEN,
        {
            method: 'POST',
            credentials: 'include', //
            headers: new Headers({
                "Authorization": `Basic YmxhYi1jbGllbnQ6YmxhYi1zZWNyZXQ=`,
            }),
            body: data
        });

        return response.json();

}


export async function login(username, password) {

    let data = new FormData();
    data.append("username", username);
    data.append("password", password);

    const response = await fetch(BASE_URL + 'users/auth', {
        method: 'POST',
        credentials: 'include',
        body: data
    });

    const body = await response.text();

    if (body === '') {
        return({isAuthenticated: false});
    }

    // get auth token
    const oAuth = await getToken(username, password);
    localStorage.setItem("oauth",   JSON.stringify(oAuth));

    return({
        isAuthenticated: true,
        user: JSON.parse(body),
        oAuth
    });
}



function refreshToken() {
    // send the regular oauth/token endpoint with refresh value to refresh token
    let data = new FormData();
    data.append("refresh_token","TOKEN_VALUE");
}






function loggedIn() {

}
