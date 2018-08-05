import { CLIENT_ID, CLIENT_SECRET} from "./auth";

export default () => {
    return {
        'Content-Type': 'application/x-www-form-urlencode',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        "Cache-Control": "no-cache"
    }
}