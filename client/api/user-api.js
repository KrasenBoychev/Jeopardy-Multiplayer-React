import * as api from "./requester.js";

const host = api.settings.host;

export async function getTopPlayers() {
  return await api.get(host + "/users/topPlayers");
}

export async function getPlayerPoints() {
  return await api.get(host + `/users/playerPoints`);
}

export async function recordUserInOnlineUsers(username, socketId) {
  return await api.post(host + `/users/recordNewUser`, { username, socketId });
}

export async function deleteUserInOnlineUsers() {
  await api.del(host + `/users/deleteUser`);
}

export async function getUserNotifications() {
  return await api.get(host + `/users/getUserNotifications`);
}

export async function removeNotification(friendUsername, type) {
  return await api.put(host + `/users/removeNotification`, {
    friendUsername,
    type,
  });
}
