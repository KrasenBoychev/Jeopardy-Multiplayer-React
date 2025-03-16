import toast from "react-hot-toast";
import { sendFriendResponse } from "../../../../../api/user-api";

export default function RejectNotification({ props }) {
  const { socket, notification, setNotificationsList } = props;

  const rejectNotification = async (e) => {
    const friendUsername = e.target.id;

    if (e.target.value == "friendRequest") {
      try {
        const response = await sendFriendResponse(
          JSON.stringify({
            username: friendUsername,
            status: "friendRequestRejected",
          })
        );

        if (response.status == "online") {
          await socket.emit("sendNotification", {
            receiverSocketId: response.friendSocketDetails.socketId,
          });
        }

        setNotificationsList(response.userDetails.notifications);
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
