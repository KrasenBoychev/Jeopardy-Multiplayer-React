import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NotificationsHeader({ notificationsProps }) {
  const {
    isSuccess,
    isError,
    notifications,
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
          notifications?.length > 0
            ? "notifications_header notifications_unread"
            : "notifications_header"
        }
        onClick={openNotifications}
      >
        <p>
          {isSuccess && notifications?.length}
          {isError && "!"}
        </p>
      </div>
    );
  }

  return content;
}
