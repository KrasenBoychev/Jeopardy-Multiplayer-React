import toast from "react-hot-toast";
import {
  useGetNotificationsQuery,
  useRemoveNotificationMutation,
} from "../notificationsApiSlice";

export default function ReadNotification({ notification }) {
  const [removeNotification, { isLoading }] = useRemoveNotificationMutation();
  const { refetch } = useGetNotificationsQuery("getNotifications");

  const readNotificationClickHandler = async () => {
    try {
      const friendUsername = notification.sentBy;
      const notificationType = notification.type;

      await removeNotification({ friendUsername, type: notificationType });

      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <button
      className="notification_btn_read"
      onClick={readNotificationClickHandler}
      disabled={isLoading ? true : false}
    >
      Mark as read
    </button>
  );
}
