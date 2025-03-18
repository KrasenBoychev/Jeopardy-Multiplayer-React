import * as api from "./requester.js";

const host = api.settings.host;

export async function getUserFriendsAndTheirStatus() {
  //used
  return await api.get(host + `/friends/getFriendsAndTheirStatus`);
}

export async function sendFriendRequest(friendUsername) {
  //used
  return await api.get(host + `/friends/addFriendRequest/${friendUsername}`);
}

export async function sendFriendResponse(username, status) {
  //used
  return await api.post(host + `/friends/friendResponse`, { username, status });
}
