import toast from "react-hot-toast";
import { sendFriendResponse } from "../../../../../api/friends-api";
import { useAuthContext } from "../../../../contexts/AuthContext";

export default function RejectNotification({ props }) {
  const {
    socket,
    friendsList,
    notification,
    setNotificationsList,
    setUpdateNotifications,
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
          });
        }

        setUpdateNotifications(true);
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
      }

      setNotificationsList((prevNotifications) => {
        return prevNotifications.filter((notification) => {
          notification.username == friendUsername &&
            notification.type == "gameInvitation";
        });
      });
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
