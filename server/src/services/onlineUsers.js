const { OnlineUsers } = require('../models/OnlineUsers');

async function addNewOnlineUser(username, socketId) {
  const record = await OnlineUsers.findById('67cabdb2203cb80f915b8cff');

  !record.onlineUsers.some((user) => user.username === username) &&
    record.onlineUsers.push({ username, socketId });

  await record.save();

  return record;
}

async function removeOnlineUser(socketId) {
    const record = await OnlineUsers.findById('67cabdb2203cb80f915b8cff');
  
    record.onlineUsers = record.onlineUsers.filter((user) => user.socketId !== socketId);
  
    await record.save();
  
    return record;
  }

module.exports = { addNewOnlineUser, removeOnlineUser };
