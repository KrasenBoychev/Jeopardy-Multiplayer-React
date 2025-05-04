import toast from "react-hot-toast";
import { updateGameInProgress } from "../../../../authentication/authSlice";
import { updateStartingPlayers } from "../../../gameSlice";
import { setSocketReq } from "../../../../socket_connection/socketSlice";
import { setCategories } from "../../../04. categories/categoriesSlice";

export async function setGameInProgress(
  userUsername,
  friends,
  changeGameInProgress,
  dispatch
) {
  try {
    await changeGameInProgress();
    dispatch(updateGameInProgress());

    const onlineFriends = friends.filter((friend) => friend.online === true);
    if (onlineFriends.length > 0) {
      dispatch(
        setSocketReq({
          socketReqName: "sendFriendGameInProgress",
          socketData: {
            receiverFriends: onlineFriends,
            username: userUsername,
          },
        })
      );
    }
  } catch (err) {
    toast.error("Cannot start new game");
    console.log(err.message);

    //isNewGameStarted false and send socket req to let the other player
  }
}

export function setPlayersDetails(user, rivalPlayer, dispatch) {
  const playersNames = [user.username, rivalPlayer.username];
  const startingPlayer =
    playersNames[Math.floor(Math.random() * playersNames.length)];
  const indexOfStartingPlayer = playersNames.indexOf(startingPlayer);
  playersNames.splice(indexOfStartingPlayer, 1);
  const otherPlayer = playersNames[0];

  const firstPlayerDetails = {
    username: startingPlayer,
    socketId:
      startingPlayer == user.username
        ? user.gameDetails.socketId
        : rivalPlayer.socketId,
  };

  const secondPlayerDetails = {
    username: otherPlayer,
    socketId:
      otherPlayer == user.username
        ? user.gameDetails.socketId
        : rivalPlayer.socketId,
  };

  dispatch(
    updateStartingPlayers({
      firstPlayerDetails,
      secondPlayerDetails,
      updateType: "add",
    })
  );

  return [firstPlayerDetails, secondPlayerDetails];
}

export async function setCategoriesFunc(
  firstPlayerDetails,
  secondPlayerDetails,
  rivalPlayer,
  newCategories,
  userSocketId,
  dispatch
) {
  try {
    dispatch(setCategories(newCategories));

    dispatch(
      setSocketReq({
        socketReqName: "sendGameDetails",
        socketData: {
          receiverSocketId: rivalPlayer.socketId,
          gameDetails: {
            firstPlayerDetails,
            secondPlayerDetails,
            newCategories,
            userSocketId,
          },
        },
      })
    );
  } catch (err) {
    toast.error(`Cannot start game. Please try again later`);
    console.log(err.message);
  }
}
