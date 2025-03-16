const { adminId } = require("../api-keys");
const { User } = require("../models/User");

async function getUserByEmail(email) {
  //used
  return await User.findOne({ email });
}

async function getUserByUsername(username) {
  //used
  return await User.findOne({ username });
}

async function getTopPlayers() {
  //used
  return await User.find({ _id: { $nin: [adminId] } })
    .sort({ points: -1 })
    .limit(10);
}

async function getPlayerPoints(username) {
  //used
  return await User.find({ username }).distinct("points");
}

async function getUserFriendsList(username) {
  //used
  return await User.find({ username }).distinct("friendsList");
}

async function getUserNotificationsList(username) {
  return await User.find({ username }).distinct("notificationsList");
}

module.exports = {
  getUserByEmail,
  getUserByUsername,
  getTopPlayers,
  getPlayerPoints,
  getUserFriendsList,
  // getUserFriendRequests,
  getUserNotificationsList,
};
