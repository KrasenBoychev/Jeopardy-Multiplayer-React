import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { useGetNotificationsQuery } from "./notificationsApiSlice";
import NotificationsHeader from "./children/NotificationsHeader";
import NotificationsBody from "./children/NotificationsBody";
import { Bell } from "lucide-react";
import "./notifications.css";

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
    <div ref={ref} className="">
      <div
        className="relative cursor-pointer pr-2.5"
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
