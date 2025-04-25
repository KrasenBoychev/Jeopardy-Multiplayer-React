import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function NotificationsHeader({ props }) {
  const { notificationsList, notificationsBox, setNotificationsBox } = props;

  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  const openNotifications = () => {
    setNotificationsBox(!notificationsBox);
  };

  useEffect(() => {
    if (notificationsBox) {
      setNotificationsBox(!notificationsBox);
    }
  }, [location]);

  return (
    <>
      {isAuthenticated && (
        <div
          className={
            notificationsList.length > 0
              ? "notifications_header notifications_unread"
              : "notifications_header"
          }
          onClick={openNotifications}
        >
          <i className="fa-solid fa-message"></i>
          <p>{notificationsList.length}</p>
        </div>
      )}
    </>
  );
}
