import * as api from './requester.js';

const host = api.settings.host;

export async function getGameToken(username) {
    return await api.get(host + '/play/' + username); 
}