import toast from "react-hot-toast";
import {
  useGetNotificationsQuery,
  useRemoveNotificationMutation,
} from "../notificationsApiSlice";

export default function ReadNotification({ notification }) {
  const [removeNotification] = useRemoveNotificationMutation();
  const { refetch } = useGetNotificationsQuery("getNotifications");

  const readNotificationClickHandler = async (e) => {
    try {
      const friendUsername = e.target.id;
      const notificationType = e.target.value;

      await removeNotification({ friendUsername, type: notificationType });

      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <button
      className="notification_btn_read"
      value={notification.type}
      id={notification.sentBy}
      onClick={readNotificationClickHandler}
    >
      Mark as read
    </button>
  );
}
