import { useDispatch, useSelector } from "react-redux";
import { setSocketReq } from "../../../../../socket_connection/socketSlice";
import { selectFriends } from "../friendsSlice";
import { selectCurrentUser } from "../../../../../authentication/authSlice";
import { updateGameReqSentBy, updateRivalPlayer } from "../../../../gameSlice";

export default function GameReqBtns({ friendUsername }) {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);

  const findFriend = friends.find(
    (friend) => friend.username == friendUsername
  );

  const acceptGameReqClickHandler = () => {
    dispatch(
      setSocketReq({
        socketReqName: "sendAcceptGameRes",
        socketData: {
          receiverSocketId: findFriend.socketId,
          username: user.username,
        },
      })
    );

    dispatch(
      updateRivalPlayer({ username: friendUsername, updateType: "add" })
    );

    //To be completed...
  };

  const rejectGameReqClickHandler = () => {
    dispatch(
      setSocketReq({
        socketReqName: "sendRejectGameRes",
        socketData: {
          receiverSocketId: findFriend.socketId,
          username: user.username,
        },
      })
    );

    dispatch(
      updateGameReqSentBy({
        username: friendUsername,
        updateType: "remove",
      })
    );
  };

  return (
    <span className="friend_game_req">
      <i
        className="fa-solid fa-circle-check"
        onClick={acceptGameReqClickHandler}
      ></i>
      <i
        className="fa-solid fa-circle-xmark"
        onClick={rejectGameReqClickHandler}
      ></i>
    </span>
  );
}

// function setPlayers(
//   usernameDetais,
//   friendDetails,
//   setFirstPlayer,
//   setSecondPlayer
// ) {
//   const playersNames = [usernameDetais, friendDetails];
//   const startingPlayerDetails =
//     playersNames[Math.floor(Math.random() * playersNames.length)];
//   const indexOfStartingPlayer = playersNames.indexOf(startingPlayerDetails);
//   playersNames.splice(indexOfStartingPlayer, 1);
//   const otherPlayerDetails = playersNames[0];
//   setFirstPlayer(startingPlayerDetails);
//   setSecondPlayer(otherPlayerDetails);
//   return { startingPlayerDetails, otherPlayerDetails };
// }

// else if (notificationType == "gameInvitation") {
//   const findFriend = friendsList.find(
//     (friend) => friend.username == friendUsername
//   );

//   if (findFriend && findFriend.online && !findFriend.gameInProgress) {
//     const usernameDetais = { username, socketId: socket.id };
//     const friendDetails = {
//       username: friendUsername,
//       socketId: findFriend.socketId,
//     };

//     const { startingPlayerDetails, otherPlayerDetails } = setPlayers(
//       usernameDetais,
//       friendDetails,
//       setFirstPlayer,
//       setSecondPlayer
//     );

//     const roomName = `${friendUsername}-${username}`;

//     await socket.emit("setAcceptGameInvitation", {
//       receiverSocketId: findFriend.socketId,
//       userUsername: username,
//       roomName,
//       playersInfo: { startingPlayerDetails, otherPlayerDetails },
//     });

//     setFriendInvited(friendUsername);
//     setGameRoomName(roomName);
//     setIsNewGameStarted(true);
//   } else {
//     // If a bug occurs, then this message will show
//     toast.error(
//       friendUsername + " is no longer online - please refresh the page"
//     );
//   }
// }
