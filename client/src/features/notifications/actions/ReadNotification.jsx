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
      className="w-max text-[13px] px-2 py-1 bg-chart-5 text-white rounded-lg cursor-pointer hover:text-black"
      onClick={readNotificationClickHandler}
      disabled={isLoading ? true : false}
    >
      Mark as read
    </button>
  );
}
