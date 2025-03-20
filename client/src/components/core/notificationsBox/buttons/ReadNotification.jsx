import toast from "react-hot-toast";
import { removeNotification } from "../../../../../api/user-api";

export default function ReadNotification({ props }) {
  const { notification, setUpdateNotifications } = props;

  const readNotification = async (e) => {
    try {
      const friendUsername = e.target.id;
      await removeNotification(friendUsername, "friendResponse");

      setUpdateNotifications(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <button
      className="notification_btn_read"
      id={notification.username}
      onClick={readNotification}
    >
      Mark as read
    </button>
  );
}
