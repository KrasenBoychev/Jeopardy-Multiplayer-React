import toast from "react-hot-toast";
import { useAuthContext } from "../../../contexts/AuthContext";
import { sendFriendResponse } from "../../../../api/friends-api";
import { removeNotificationFromNotificationsList } from "../NotificationsBox";

export default function RejectNotification({ props }) {
  const {
    socket,
    friendsList,
    notification,
    setNotificationsList,
  } = props;

  const { username } = useAuthContext();

  const rejectNotification = async (e) => {
    const friendUsername = e.target.id;
    const notificationType = e.target.value;

    if (notificationType == "friendRequest") {
      try {
        const response = await sendFriendResponse(
          friendUsername,
          "friendRequestRejected"
        );

        if (response.status == "online") {
          await socket.emit("sendNotification", {
            receiverSocketId: response.socketId,
            msg: "friendResponse",
            data: {
              friendUsername: username,
              content: " rejected your friend request",
              btns: "Mark as read",
            },
          });
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
        await socket.emit("setRejectGameInvitation", {
          receiverSocketId: findFriend.socketId,
          userUsername: username,
        });
      } else {
        // If a bug occurs, then this message will show
        toast.error(
          friendUsername + " is no longer online - please refresh the page"
        );
      }

      removeNotificationFromNotificationsList(
        setNotificationsList,
        friendUsername,
        notificationType
      );
    }
  };
  return (
    <button
      className="notification_btn_reject"
      value={notification.type}
      id={notification.username}
      onClick={rejectNotification}
    >
      Reject
    </button>
  );
}
