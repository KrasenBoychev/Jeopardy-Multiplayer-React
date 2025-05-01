import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NotificationsHeader({ notificationsProps }) {
  const {
    isSuccess,
    receivedNotifications,
    notificationsOpened,
    setNotificationsOpened,
  } = notificationsProps;

  const location = useLocation();

  useEffect(() => {
    if (notificationsOpened) {
      setNotificationsOpened(!notificationsOpened);
    }
  }, [location]);

  const openNotifications = () => {
    setNotificationsOpened(!notificationsOpened);
  };

  let content;
  if (isSuccess) {
    content = (
      <div
        className={
          receivedNotifications?.length > 0
            ? "notifications_header notifications_unread"
            : "notifications_header"
        }
        onClick={openNotifications}
      >
        <i className="fa-solid fa-message"></i>
        <p>{receivedNotifications?.length}</p>
      </div>
    );
  }

  return content;
}
