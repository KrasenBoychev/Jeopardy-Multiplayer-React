import * as api from './requester.js';

const host = api.settings.host;

export async function getTopPlayers() {
    return await api.get(host + '/users/topPlayers');
  }
  
  export async function getPlayerPoints(userId) {
    return await api.get(host + `/users/playerPoints/${userId}`);
  }
  
  export async function getFriendsOnline(userId) {
    return await api.get(host + `/onlineUsers/friendsOnline/${userId}`);
  }