import { BASE_URL } from "../api";


function loginData() {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000') {
        port = ':8080';
    }
    window.location.href = '//' + window.location.hostname + port + '/private';
}


async function logout() {
    console.log('logging out...');
    fetch(BASE_URL + '/logout', {method: 'POST', credentials: 'include',
        headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
        .then(response => {
            window.location.href = response.logoutUrl + "?id_token_hint=" +
                response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
        });
}



export async function login() {
    const response = await fetch(BASE_URL + 'users/loggedIn', {credentials: 'include'});
    const body = await response.text();

    console.log(body);

    if (body === '') {
        return({isAuthenticated: false});
    }
        return({isAuthenticated: true, user: JSON.parse(body)});

}

function loggedIn() {
    return localStorage.auth && fetch(
        `${BASE_URL}/api/vehicle`,
        {headers: headers()})
        .then(checkResponseStatus)
        .then(() => { return true })
        .catch(this.refreshToken)
        .catch(() => { return false });
}