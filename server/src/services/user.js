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
    .sort({ "gameDetails.points": -1 })
    .limit(10);
}

async function getUserPoints(username) {
  return await User.find({ username }).distinct("gameDetails.points");
}

async function getUserFriendsList(username) {
  return await User.find({ username }).distinct("gameDetails.friendsList");
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

module.exports = {
  getUserByEmail,
  getUserByUsername,
  getTopPlayers,
  getUserPoints,
  getUserFriendsList,
  addUsernameToFriendsList,
  getUserNotificationsList,
  addNotification,
  removeNotification,
};
