import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSendFriendResMutation } from "../../game/01. play_page/children/friendsList/friendsApiSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { addNewFriend } from "../../game/01. play_page/children/friendsList/friendsSlice";
import { useGetNotificationsQuery } from "../notificationsApiSlice";

export default function AcceptNotification({ notification }) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [sendFriendRes] = useSendFriendResMutation();
  const { refetch } = useGetNotificationsQuery("getNotifications");

  const acceptNotificationClickHandler = async (e) => {
    const friendUsername = e.target.id;
    const notificationType = e.target.value;

    try {
      if (notificationType == "addFriendReq") {
        const sendFriendResServerRes = await sendFriendRes({
          friendUsername,
          response: "accepted",
        });

        const friendDetails = sendFriendResServerRes.data;

        if (friendDetails.online === true) {
          dispatch(
            setSocketReq({
              socketReqName: "setFriendReqAccepted",
              socketData: {
                receiverSocketId: friendDetails.socketId,
                userDetails: {
                  username: user.username,
                  online: user.gameDetails.online,
                  socketId: user.gameDetails.socketId,
                  gameInProgress: user.gameDetails.gameInProgress,
                },
              },
            })
          );
        }

        dispatch(addNewFriend(friendDetails));
      }
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

      refetch();
    } catch (error) {
      toast.error("Cannot accept the notification");
      console.log(error.message);
    }
  };

  return (
    <button
      className="notification_btn_accept"
      value={notification.type}
      id={notification.sentBy}
      onClick={acceptNotificationClickHandler}
    >
      Accept
    </button>
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
