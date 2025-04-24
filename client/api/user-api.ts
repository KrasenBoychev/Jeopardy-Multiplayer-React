import * as api from "./requester.js";

const host = api.settings.host;

export async function getTopPlayers() {
  return await api.get(host + "/users/topPlayers");
}

export async function getUserNotifications() {
  return await api.get(host + `/users/getUserNotifications`);
}

export async function removeNotification(friendUsername: string, type: string) {
  return await api.put(host + `/users/removeNotification`, {
    friendUsername,
    type,
  });
}

// export async function recordUserInOnlineUsers(socketId: string) {
//   return await api.post(host + `/users/recordNewOnlineUser`, {
//     socketId,
//   });
// }

export async function deleteUserInOnlineUsers() {
  await api.del(host + `/users/deleteOnlineUser`);
}

export async function updateGameInProgress() {
  return await api.put(host + `/users/gameInProgress`);
}
