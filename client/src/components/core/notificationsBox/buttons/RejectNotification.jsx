import toast from "react-hot-toast";
import { sendFriendResponse } from "../../../../../api/friends-api";

export default function RejectNotification({ props }) {
  const { socket, notification, setUpdateNotifications } = props;

  const rejectNotification = async (e) => {
    const friendUsername = e.target.id;

    if (e.target.value == "friendRequest") {
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
