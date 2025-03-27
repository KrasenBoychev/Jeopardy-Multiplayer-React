export function getPlayersDetails(userUsername, firstPlayer, secondPlayer) {
  const userUsernameDetails =
    firstPlayer.username == userUsername ? firstPlayer : secondPlayer;
  const friendUsernameDetails =
    firstPlayer.username == userUsername ? secondPlayer : firstPlayer;

  return { userUsernameDetails, friendUsernameDetails };
}

export function getFriendSocketId(activePlayer, firstPlayer, secondPlayer) {
  return activePlayer == firstPlayer.username
    ? secondPlayer.socketId
    : firstPlayer.socketId;
}

// export function setNewActivePlayer(
//   activePlayer,
//   setActivePlayer,
//   firstPlayer,
//   secondPlayer
// ) {
//   const newActivePlayer =
//     activePlayer == firstPlayer.username
//       ? secondPlayer.username
//       : firstPlayer.username;
//   setActivePlayer(newActivePlayer);

//   return newActivePlayer;
// }
