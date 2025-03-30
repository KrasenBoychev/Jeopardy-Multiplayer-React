import * as api from "./requester.js";

const host = api.settings.host;

export async function getUserFriendsAndTheirStatus() {
  return await api.get(host + `/friends/getFriendsAndTheirStatus`);
}

export async function sendFriendRequest(friendUsername: string) {
  return await api.put(host + `/friends/addFriendRequest`, { friendUsername });
}

export async function sendFriendResponse(username: string, type: string) {
  return await api.put(host + `/friends/friendResponse`, { username, type });
}
