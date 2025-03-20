import * as api from "./requester.js";

const host = api.settings.host;

export async function getUserFriendsAndTheirStatus() {
  return await api.get(host + `/friends/getFriendsAndTheirStatus`);
}

export async function sendFriendRequest(friendUsername) {
  return await api.put(host + `/friends/addFriendRequest`, { friendUsername });
}

export async function sendFriendResponse(username, type) {
  return await api.put(host + `/friends/friendResponse`, { username, type });
}
