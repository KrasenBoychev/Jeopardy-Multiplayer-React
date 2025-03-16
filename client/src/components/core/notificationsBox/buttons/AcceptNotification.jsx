import toast from "react-hot-toast";
import { sendFriendResponse } from "../../../../../api/user-api";
import { useAuthContext } from "../../../../contexts/AuthContext";

export default function AcceptNotification({ props }) {
  const { socket, notification, setNotificationsList, setFriendsList } = props;
  const { username } = useAuthContext();

  const acceptNotification = async (e) => {
    const friendUsername = e.target.id;

    if (e.target.value == "friendRequest") {
      try {
        const response = await sendFriendResponse(
          JSON.stringify({
            username: friendUsername,
            status: "friendRequestAccepted",
          })
        );

        if (response.status == "online") {
          await socket.emit("sendNotification", {
            receiverSocketId: response.friendSocketDetails.socketId,
            msg: "friendRequestAccepted",
            data: { username, online: true, socketId: socket.id },
          });

          setFriendsList((prev) => [
            ...prev,
            {
              username: friendUsername,
              online: true,
              socketId: response.friendSocketDetails.socketId,
            },
          ]);
        } else {
          setFriendsList((prev) => [
            ...prev,
            { username: friendUsername, online: false },
          ]);
        }

        setNotificationsList(response.userDetails.notifications);
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
