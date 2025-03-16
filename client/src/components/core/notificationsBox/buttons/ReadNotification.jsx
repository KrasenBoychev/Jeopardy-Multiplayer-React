import toast from "react-hot-toast";
import { removeNotification } from "../../../../../api/user-api";

export default function ReadNotification({ props }) {
  const { notification, setNotificationsList } = props;
  
  const readNotification = async (e) => {
    try {
      const friendUsername = e.target.id;
      const response = await removeNotification(friendUsername);

      setNotificationsList(response.notifications);
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
