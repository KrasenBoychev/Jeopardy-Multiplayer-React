import toast from "react-hot-toast";
import { removeNotification } from "../../../../api/user-api";
import { removeNotificationFromNotificationsList } from "../NotificationsBox";

export default function ReadNotification({ props }) {
  const { notification, setNotificationsList } = props;

  const readNotification = async (e) => {
    try {
      const friendUsername = e.target.id;
      const notificationType = e.target.value;

      await removeNotification(friendUsername, "friendResponse");

      removeNotificationFromNotificationsList(
        setNotificationsList,
        friendUsername,
        notificationType
      );
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <button
      className="notification_btn_read"
      value={notification.type}
      id={notification.username}
      onClick={readNotification}
    >
      Mark as read
    </button>
  );
}
