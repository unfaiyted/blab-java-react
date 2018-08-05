import { CLIENT_ID, CLIENT_SECRET} from "./auth";

export default () => {
    return {
        'Content-Type': 'application/x-www-form-urlencode',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        "Cache-Control": "no-cache"
    }
}


export function authHeader() {
    //return this header if user is authenticated stored
    const oAuth = JSON.parse(localStorage.getItem('oAuth'));

    if (oAuth && oAuth.access_token) {
        return {
            'Authorization': `Bearer ${oAuth.access_token}`
        }
    }
    return {};
}