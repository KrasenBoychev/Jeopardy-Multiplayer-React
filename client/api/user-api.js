import * as api from './requester.js';

const host = api.settings.host;

export async function getTopPlayers() {
    return await api.get(host + '/users/topPlayers');
}

export async function getPlayerPoints() {
    return await api.get(host + `/users/playerPoints`);
}

export async function getFriendsOnline() {
    return await api.get(host + `/onlineUsers/friendsOnline`);
}

export async function sendFriendRequest(friendUsername) {
    return await api.get(host + `/users/friendRequest/${friendUsername}`);
}

export async function sendFriendResponse(data) {
    return await api.get(host + `/users/friendResponse/${data}`);
}

export async function getUserNotifications() {
    return await api.get(host + `/users/getUserNotifications`);
}

export async function removeNotification(friendUsername) {
    return await api.get(host + `/users/removeNotification/${friendUsername}`);
}