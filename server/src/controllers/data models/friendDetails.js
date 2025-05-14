const friendDetailsModel = (friend) => {
  return {
    username: friend.username,
    online: friend.gameDetails.online,
    socketId: friend.gameDetails.socketId,
    gameInProgress: friend.gameDetails.gameInProgress,
  };
};

const onlineFriendsModel = (friend) => {
  return {
    username: friend.username,
    socketId: friend.gameDetails.socketId,
  };
};

module.exports = { friendDetailsModel, onlineFriendsModel };
