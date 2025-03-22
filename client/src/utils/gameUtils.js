export function getPlayersDetails(userUsername, firstPlayer, secondPlayer) {
  const userUsernameDetails =
    firstPlayer.username == userUsername ? firstPlayer : secondPlayer;
  const friendUsernameDetails =
    firstPlayer.username == userUsername ? secondPlayer : firstPlayer;

  return { userUsernameDetails, friendUsernameDetails };
}
