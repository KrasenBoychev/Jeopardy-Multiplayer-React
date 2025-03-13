const { adminId } = require('../api-keys');
const { User } = require('../models/User');

async function getTopPlayers() {
  return await User.find({ _id: { $nin: [adminId] } })
    .sort({ points: -1 })
    .limit(10);
}

async function getPlayerPoints(userId) {
  return await User.find({ _id: userId }).distinct('points');
}

async function getUserFriendsList(username) {
    return await User.find({ username }).distinct('friendsList');
}

async function getUserFriendRequests(userId) {
  return await User.find({ _id: userId }).distinct('friendRequests');
}

async function getUserByUsername(username) {
  return await User.find({ username });
}

module.exports = {
  getTopPlayers,
  getPlayerPoints,
  getUserFriendsList,
  getUserFriendRequests,
  getUserByUsername,
};
