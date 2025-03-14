const { adminId } = require('../api-keys');
const { User } = require('../models/User');

async function getUserByUsername(username) {
  return await User.find({ username });
}

async function getTopPlayers() {
  return await User.find({ _id: { $nin: [adminId] } })
    .sort({ points: -1 })
    .limit(10);
}

async function getPlayerPoints(username) {
  return await User.find({ username }).distinct('points');
}

async function getUserFriendsList(username) {
    return await User.find({ username }).distinct('friendsList');
}

async function getUserFriendRequests(username) {
  return await User.find({ username }).distinct('friendRequests');
}

async function getUserNotificationsList(username) {
  return await User.find({ username }).distinct('notificationsList');
}

module.exports = {
  getUserByUsername,
  getTopPlayers,
  getPlayerPoints,
  getUserFriendsList,
  getUserFriendRequests,
  getUserNotificationsList,
};
