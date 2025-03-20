const { User } = require("../models/User");

async function getUserFriendsList(username) {
  return await User.find({ username }).distinct("friendsList");
}

async function getUserFriendRequests(userUsername, friendUsername) {
  const result = await User.find({
    username: userUsername,
    friendRequests: { $in: [friendUsername] },
  });

  if (result && result.length > 0) {
    return true;
  } else if (result && result.length == 0) {
    return false;
  } else {
    return result;
  }
}

async function addUsernameToFriendRequests(userUsername, friendUsername) {
  return await User.updateOne(
    { username: userUsername },
    { $addToSet: { friendRequests: friendUsername } }
  );
}

async function removeUsernameFromFriendRequests(userUsername, friendUsername) {
  return await User.updateOne(
    { username: userUsername },
    { $pull: { friendRequests: friendUsername } }
  );
}

async function addUsernameToFriendsList(userUsername, friendUsername) {
  return await User.updateOne(
    { username: userUsername },
    { $addToSet: { friendsList: friendUsername } }
  );
}

module.exports = {
  getUserFriendsList,
  getUserFriendRequests,
  addUsernameToFriendRequests,
  removeUsernameFromFriendRequests,
  addUsernameToFriendsList,
};
