import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { useGetNotificationsQuery } from "./notificationsApiSlice";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsBody from "./NotificationsBody";
import { Bell } from "lucide-react";

export default function Notifications() {
  const [notificationsOpened, setNotificationsOpened] = useState(false);
  const location = useLocation();
  const ref = useRef();
  useOutsideClick(ref, () => setNotificationsOpened(false));

  const {
    data: notifications,
    isSuccess,
    isError,
  } = useGetNotificationsQuery("getNotifications", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (notificationsOpened) {
      setNotificationsOpened(!notificationsOpened);
    }
  }, [location]);

  return (
    <div ref={ref}>
      <div
        className="relative flex items-start cursor-pointer"
        onClick={() =>
          setNotificationsOpened(notificationsOpened ? false : true)
        }
      >
        <Bell
          width={25}
          height={25}
          color={`${
            notifications && notifications.length > 0 ? "red" : "white"
          }`}
          className="max-[1600px]:w-[20px] max-[1600px]:h-[20px] max-[1400px]:w-[15px] max-[1400px]:h-[15px]"
        />
        <NotificationsHeader
          notificationsProps={{
            isSuccess,
            isError,
            notifications,
          }}
        />
      </div>

      {notificationsOpened && (
        <NotificationsBody
          notificationsProps={{
            isSuccess,
            isError,
            notifications,
          }}
        />
      )}
    </div>
  );
}
