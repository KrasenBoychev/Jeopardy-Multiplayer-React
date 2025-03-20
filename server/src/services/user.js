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

async function getPlayerPoints(username) {
  return await User.find({ username }).distinct("points");
}

async function getUserNotificationsList(username) {
  return await User.find({ username }).distinct("notificationsList");
}

async function addNotification(userUsername, notification) {
  return await User.updateOne(
    { username: userUsername },
    { $push: { notificationsList: notification } }
  );
}

async function removeNotification(userUsername, type, friendUsername) {
  return await User.updateOne(
    { username: userUsername },
    { $pull: { notificationsList: { username: friendUsername, type } } }
  );
}

module.exports = {
  getUserByEmail,
  getUserByUsername,
  getTopPlayers,
  getPlayerPoints,
  getUserNotificationsList,
  addNotification,
  removeNotification,
};
