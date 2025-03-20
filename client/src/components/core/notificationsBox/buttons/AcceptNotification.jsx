import toast from "react-hot-toast";
import { sendFriendResponse } from "../../../../../api/friends-api";
import { useAuthContext } from "../../../../contexts/AuthContext";

export default function AcceptNotification({ props }) {
  const {
    socket,
    notification,
    setFriendsList,
    isNewGameStarted,
    setUpdateNotifications,
  } = props;
  const { username } = useAuthContext();

  const acceptNotification = async (e) => {
    const friendUsername = e.target.id;

    if (e.target.value == "friendRequest") {
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
              username,
              online: true,
              socketId: socket.id,
              gameInProgress: isNewGameStarted,
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

        setUpdateNotifications(true);
      } catch (error) {
        toast.error(error.message);
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
