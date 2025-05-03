const friendDetails = (friend) => {
  return {
    username: friend.username,
    online: friend.gameDetails.online,
    socketId: friend.gameDetails.socketId,
    gameInProgress: friend.gameDetails.gameInProgress,
  };
};

module.exports = { friendDetails };
