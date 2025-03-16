const { OnlineUser } = require("../models/OnlineUsers");

async function getOnlineUserDetails(username) {
  //used
  return await OnlineUser.findOne({ username });
}

async function getOnlineUsers(friendsList) {
  //used
  return await OnlineUser.find({ username: { $in: friendsList } });
}

async function addNewOnlineUser(username, socketId) {
  //used
  const existingOnlineUser = await OnlineUser.findOne({ username });

  if (existingOnlineUser) {
    existingOnlineUser.socketId = socketId;
    await existingOnlineUser.save();

    return existingOnlineUser;
  } else {
    const userOnline = new OnlineUser({
      username,
      socketId,
      gameInProgress: false,
    });
    await userOnline.save();

    return userOnline;
  }
}

async function deleteOnlineUser(username) {
  //used
  await OnlineUser.deleteOne({ username });
}

async function changeOnlineUserGameInProgress(usernames, socketId) {
  const friends = await getOnlineFriends(usernames);

  friends = friends.map((friend) => friend.gameInProg);

  // !record.onlineUsers.some((user) => user.username === username) &&
  //   record.onlineUsers.push({ username, socketId, gameInProgress: false });

  // await record.save();

  // return record;
}

async function removeOnlineUser(socketId) {
  // const record = await getOnlineUser();
  // record.onlineUsers = record.onlineUsers.filter(
  //   (user) => user.socketId !== socketId
  // );
  // await record.save();
  // return record;
}

module.exports = {
  getOnlineUserDetails,
  getOnlineUsers,
  addNewOnlineUser,
  deleteOnlineUser,
  removeOnlineUser,
  changeOnlineUserGameInProgress,
};
