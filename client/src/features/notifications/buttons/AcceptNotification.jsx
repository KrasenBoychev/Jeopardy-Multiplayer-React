import toast from "react-hot-toast";
import { useAuthContext } from "../../../contexts/AuthContext";
import { sendFriendResponse } from "../../../../api/friends-api";
import { removeNotificationFromNotificationsList } from "../Notifications";

export default function AcceptNotification({ props }) {
  const {
    socket,
    notification,
    friendsList,
    setFriendsList,
    friendInvited,
    setFriendInvited,
    setNotificationsList,
    setIsNewGameStarted,
    setFirstPlayer,
    setSecondPlayer,
    setGameRoomName,
  } = props;
  const { username } = useAuthContext();

  const acceptNotification = async (e) => {
    const friendUsername = e.target.id;
    const notificationType = e.target.value;

    if (notificationType == "friendRequest") {
      try {
        const response = await sendFriendResponse(
          friendUsername,
          "friendRequestAccepted"
        );

        if (response.status == "online") {
          await socket.emit("sendNotification", {
            receiverSocketId: response.socketId,
            msg: "friendRequestAccepted",
            data: {
              friendsListUpdate: {
                username,
                online: true,
                socketId: socket.id,
                gameInProgress: friendInvited ? true : false,
              },
              notificationInfo: {
                friendUsername: username,
                content: " accepted your friend request",
                btns: "Mark as read",
              },
            },
          });

          setFriendsList((prev) => [
            ...prev,
            {
              username: friendUsername,
              online: true,
              socketId: response.socketId,
              gameInProgress: response.gameInProgress,
            },
          ]);
        } else {
          setFriendsList((prev) => [
            ...prev,
            { username: friendUsername, online: false },
          ]);
        }

        removeNotificationFromNotificationsList(
          setNotificationsList,
          friendUsername,
          notificationType
        );
      } catch (error) {
        toast.error(error.message);
      }
    } else if (notificationType == "gameInvitation") {
      const findFriend = friendsList.find(
        (friend) => friend.username == friendUsername
      );

      if (findFriend && findFriend.online && !findFriend.gameInProgress) {
        const usernameDetais = { username, socketId: socket.id };
        const friendDetails = {
          username: friendUsername,
          socketId: findFriend.socketId,
        };

        const { startingPlayerDetails, otherPlayerDetails } = setPlayers(
          usernameDetais,
          friendDetails,
          setFirstPlayer,
          setSecondPlayer
        );

        const roomName = `${friendUsername}-${username}`;

        await socket.emit("setAcceptGameInvitation", {
          receiverSocketId: findFriend.socketId,
          userUsername: username,
          roomName,
          playersInfo: { startingPlayerDetails, otherPlayerDetails },
        });

        setFriendInvited(friendUsername);
        setGameRoomName(roomName);
        setIsNewGameStarted(true);
      } else {
        // If a bug occurs, then this message will show
        toast.error(
          friendUsername + " is no longer online - please refresh the page"
        );
      }
    }
  };

  return (
    <button
      className="notification_btn_accept"
      value={notification.type}
      id={notification.username}
      onClick={acceptNotification}
    >
      Accept
    </button>
  );
}

function setPlayers(
  usernameDetais,
  friendDetails,
  setFirstPlayer,
  setSecondPlayer
) {
  const playersNames = [usernameDetais, friendDetails];

  const startingPlayerDetails =
    playersNames[Math.floor(Math.random() * playersNames.length)];

  const indexOfStartingPlayer = playersNames.indexOf(startingPlayerDetails);

  playersNames.splice(indexOfStartingPlayer, 1);
  const otherPlayerDetails = playersNames[0];

  setFirstPlayer(startingPlayerDetails);
  setSecondPlayer(otherPlayerDetails);

  return { startingPlayerDetails, otherPlayerDetails };
}
