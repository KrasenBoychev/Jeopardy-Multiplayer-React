const { adminId } = require("../api-keys");
const { User } = require("../models/User");
// const { OnlineUser } = require("../models/OnlineUsers");

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

async function changeOnlineStatus(username, socketId) {
  return await User.updateOne({ username }, [
    {
      $set: {
        "gameDetails.online": { $not: "$gameDetails.online" },
        "gameDetails.socketId": socketId,
      },
    },
  ]);
}

async function findFriendsDetails(friendsList) {
  return await User.find({
    username: { $in: friendsList },
  });
}

async function getUserNotificationsList(username) {
  return await User.find({ username }).distinct("notificationsList");
}

async function getUserFriendsList(username) {
  return await User.find({ username }).distinct("gameDetails.friendsList");
}

async function getUserSocketId(username) {
  return await User.find({ username }).distinct("gameDetails.socketId");
}

async function addNotification(username, newNotification) {
  return await User.updateOne(
    { username },
    { $push: { notificationsList: newNotification } }
  );
}

// async function removeNotification(userUsername, type, friendUsername) {
//   return await User.updateOne(
//     { username: userUsername },
//     { $pull: { notificationsList: { username: friendUsername, type } } }
//   );
// }

// async function updateGameInProgress(username) {
//   return await OnlineUser.updateOne({ username }, [
//     { $set: { gameInProgress: { $not: "$gameInProgress" } } },
//   ]);
// }

module.exports = {
  getUserByEmail,
  getUserByUsername,
  getTopPlayers,
  changeOnlineStatus,
  findFriendsDetails,
  getUserNotificationsList,
  getUserFriendsList,
  getUserSocketId,
  addNotification,
  // removeNotification,
  // updateGameInProgress,
};
