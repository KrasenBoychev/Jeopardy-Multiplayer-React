const { User } = require("../models/User");
const { OnlineUser } = require("../models/OnlineUsers");

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

module.exports = {
  getUserFriendRequests,
};
