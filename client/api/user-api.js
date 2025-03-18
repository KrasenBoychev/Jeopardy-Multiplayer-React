import * as api from "./requester.js";

const host = api.settings.host;

export async function getTopPlayers() {
  //used
  return await api.get(host + "/users/topPlayers");
}

export async function getPlayerPoints() {
  //used
  return await api.get(host + `/users/playerPoints`);
}

export async function recordUserInOnlineUsers(username, socketId) {
  //used
  return await api.post(host + `/users/recordNewUser`, { username, socketId });
}

export async function deleteUserInOnlineUsers() {
  //used
  await api.del(host + `/users/deleteUser`);
}

export async function getUserNotifications() {
  //used
  return await api.get(host + `/users/getUserNotifications`);
}

export async function removeNotification(friendUsername) {
  return await api.get(host + `/users/removeNotification/${friendUsername}`);
}
