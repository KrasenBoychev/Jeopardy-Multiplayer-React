import toast from "react-hot-toast";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { sendFriendResponse } from "../../../../../api/friends-api";
import { removeNotificationFromNotificationsList } from "../NotificationsBox";

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
        await socket.emit("setAcceptGameInvitation", {
          receiverSocketId: findFriend.socketId,
          userUsername: username,
          friendUsername,
        });

        setFriendInvited(friendUsername);
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
