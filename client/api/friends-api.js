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
