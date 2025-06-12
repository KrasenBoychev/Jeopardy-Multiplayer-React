import { useRef, useState } from "react";
import { useGetNotificationsQuery } from "./notificationsApiSlice";
import NotificationsHeader from "./children/NotificationsHeader";
import NotificationsBody from "./children/NotificationsBody";
import "./notifications.css";

export default function Notifications() {
  const [notificationsOpened, setNotificationsOpened] = useState(false);

  const {
    data: notifications,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotificationsQuery("getNotifications", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <>
      <NotificationsHeader
        notificationsProps={{
          isSuccess,
          notifications,
          notificationsOpened,
          setNotificationsOpened,
        }}
      />
      {notificationsOpened && (
        <NotificationsBody
          notificationsProps={{
            isSuccess,
            notifications,
          }}
        />
      )}
    </>
  );
}
