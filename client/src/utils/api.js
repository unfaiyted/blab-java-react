import { isObject } from './helpers'


const BASE_URL = 'http://localhost:8080/';


async function getBeerData() {
    const response = await fetch(BASE_URL + 'good-beers');
    return response.json();
}


function handleError(error) {
    console.warn(error);
    return null;
}

export async function getInitialData () {
    const [beers] = await Promise.all([
        getBeerData()
    ]).catch(handleError);

    return({
        beers
    })

}


