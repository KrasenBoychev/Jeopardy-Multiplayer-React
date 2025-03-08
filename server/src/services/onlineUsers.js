const { OnlineUsers } = require('../models/OnlineUsers');

async function getOnlineUsers() {
  return await OnlineUsers.findById('67cc1e18fa8c045b3ea31034');
}

async function getOnlineFriends(friendsList) {
  return await OnlineUsers.find({ "onlineUsers.username": { $in: friendsList } },
    { "onlineUsers.username": 1 }
  ).distinct("onlineUsers");
}

async function addNewOnlineUser(username, socketId) {
  const record = await getOnlineUsers();

  !record.onlineUsers.some((user) => user.username === username) &&
    record.onlineUsers.push({ username, socketId });

  await record.save();

  return record;
}

async function removeOnlineUser(socketId) {
  const record = await getOnlineUsers();

  record.onlineUsers = record.onlineUsers.filter((user) => user.socketId !== socketId);

  await record.save();

  return record;
}

module.exports = { getOnlineUsers, getOnlineFriends, addNewOnlineUser, removeOnlineUser };
