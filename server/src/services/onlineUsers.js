const { OnlineUsers } = require("../models/OnlineUsers");

async function getOnlineUsers() {
  return await OnlineUsers.findById("67cc1e18fa8c045b3ea31034");
}

async function getOnlineFriends(friendsList) {
  return await OnlineUsers.find(
    { "onlineUsers.username": { $in: friendsList } },
    { "onlineUsers.username": 1 }
  ).distinct("onlineUsers");
}

async function addNewOnlineUser(username, socketId) {
  const record = await getOnlineUsers();

  !record.onlineUsers.some((user) => user.username === username) &&
    record.onlineUsers.push({ username, socketId, gameInProgress: false });

  await record.save();

  return record;
}

async function changeOnlineUserGameInProgress(usernames, socketId) {
  const friends = await getOnlineFriends(usernames);

  friends = friends.map((friend) => friend.gameInProg)

  // !record.onlineUsers.some((user) => user.username === username) &&
  //   record.onlineUsers.push({ username, socketId, gameInProgress: false });

  // await record.save();

  // return record;
}

async function removeOnlineUser(socketId) {
  const record = await getOnlineUsers();

  record.onlineUsers = record.onlineUsers.filter(
    (user) => user.socketId !== socketId
  );

  await record.save();

  return record;
}

async function checkIfUserIsOnline(username) {
  return await OnlineUsers.findOne(
    {
      "onlineUsers.username": username,
    },
    {
      "onlineUsers.$": 1,
    }
  );
}

module.exports = {
  getOnlineUsers,
  getOnlineFriends,
  addNewOnlineUser,
  removeOnlineUser,
  checkIfUserIsOnline,
  changeOnlineUserGameInProgress,
};
