const { adminId } = require("../api-keys");
const { User } = require("../models/User");

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function getUserByUsername(username) {
  return await User.findOne({ username });
}

async function getTopPlayers() {
  return await User.find({ _id: { $nin: [adminId] } })
    .sort({ points: -1 })
    .limit(10);
}

async function getUserSocketId(username) {
  return await User.find({ username }).distinct("gameDetails.socketId");
}

async function getUserFriendsList(username) {
  return await User.find({ username }).distinct("gameDetails.friendsList");
}

async function findFriendsDetails(friendsList) {
  return await User.find({
    username: { $in: friendsList },
  });
}

async function findOnlineFriends(friendsList) {
  return await User.find({
    username: { $in: friendsList },
    "gameDetails.online": true,
  });
}

async function addUsernameToFriendsList(userUsername, friendUsername) {
  return await User.updateOne(
    { username: userUsername },
    { $addToSet: { "gameDetails.friendsList": friendUsername } }
  );
}

async function getUserNotificationsList(username) {
  return await User.find({ username }).distinct("notificationsList");
}

async function addNotification(username, newNotification) {
  return await User.updateOne(
    { username },
    { $push: { notificationsList: newNotification } }
  );
}

async function removeNotification(userUsername, friendUsername, type) {
  return await User.updateOne(
    { username: userUsername },
    { $pull: { notificationsList: { type, sentBy: friendUsername } } }
  );
}

async function changeOnlineStatus(username, socketId) {
  const online = socketId == "" ? false : true;

  return await User.findOneAndUpdate({ username }, [
    {
      $set: {
        "gameDetails.online": online,
        "gameDetails.socketId": socketId,
      },
    },
  ]);
}

async function updateGameInProgress(username) {
  return await User.updateOne({ username }, [
    {
      $set: {
        "gameDetails.gameInProgress": { $not: "$gameDetails.gameInProgress" },
      },
    },
  ]);
}

module.exports = {
  getUserByEmail,
  getUserByUsername,
  getTopPlayers,
  getUserSocketId,
  getUserFriendsList,
  findFriendsDetails,
  findOnlineFriends,
  addUsernameToFriendsList,
  getUserNotificationsList,
  addNotification,
  removeNotification,
  changeOnlineStatus,
  updateGameInProgress,
};
