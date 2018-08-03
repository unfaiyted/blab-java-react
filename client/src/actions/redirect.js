import createBrowserHistory from "history/createBrowserHistory"
export const SET_REDIRECT = 'SET_REDIRECT';



export function setRedirectUrl(currentUrl) {
    return {
        type: SET_REDIRECT,
        currentUrl
    }
}



export function navigateTo(redirectUrl) {
   return createBrowserHistory.push(redirectUrl);
}