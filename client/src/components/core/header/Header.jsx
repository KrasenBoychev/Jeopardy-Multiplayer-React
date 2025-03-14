import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext.jsx";
import { adminId } from "../../../common/credentials.js";
import { getUserNotifications } from "../../../../api/user-api.js";

import NotificationsBox from "./notificationsBox/NotificationsBox.jsx";

import "./header.css";
import "./NotificationsBox/notificationsBox.css";
import toast from "react-hot-toast";

export default function Header({ socket, setFriendsList }) {
  const { isAuthenticated, username, userId } = useAuthContext();
  const location = useLocation();

  const [currLocation, setCurrLocation] = useState(null);
  const [notificationsBox, setNotificationsBox] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);

  useEffect(() => {
    (async function getNotificationsFunc() {
      if (isAuthenticated) {
        try {
          const userNotifications = await getUserNotifications();
          setNotificationsList(userNotifications);
        } catch (error) {
          toast.error(error.message);
        }
      }
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    socket?.on("getNotification", async ({ msg, data }) => {
      try {
        const userNotifications = await getUserNotifications();
        setNotificationsList(userNotifications);

        if (msg == 'friendRequestAccepted') {
          setFriendsList((prev) => [...prev, data]);
        }

      } catch (error) {
        toast.error(error.message);
      }
    });
  }, [socket]);

  useEffect(() => {
    setCurrLocation(location.pathname);
    if (notificationsBox) {
      setNotificationsBox(!notificationsBox);
    }
  }, [location]);

  const openNotifications = () => {
    setNotificationsBox(!notificationsBox);
  };

  return (
    <header>
      <nav>
        <ul className="logo">
          <li>Welcome, {isAuthenticated ? username : "guest"}</li>
        </ul>

        <ul className="profile">
          <li>
            <NavLink to="/" className={currLocation == "/" ? "header_active_link" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={currLocation == "/about" ? "header_active_link" : ""}>About</NavLink>
          </li>
          <li>
            <NavLink to="/play" className={currLocation == "/play" ? "header_active_link" : ""}>Play</NavLink>
          </li>
          {userId == adminId && (
            <li>
              <NavLink to="/create" className={currLocation == "/create" ? "header_active_link" : ""}>Create</NavLink>
            </li>
          )}

          {isAuthenticated ? (
            <>
              <li
                className={notificationsBox ? "header_game_invitations header_active_link" : "header_game_invitations"}
                onClick={openNotifications}
              >
                Notifications <span>{notificationsList.length}</span>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={currLocation == "/login" ? "header_active_link" : ""}>Login</NavLink>
              </li>
              <li>
                <NavLink to="/register" className={currLocation == "/register" ? "header_active_link" : ""}>Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      {notificationsBox && <NotificationsBox socket={socket} setFriendsList={setFriendsList} notifications={{ notificationsList, setNotificationsList }} />}
    </header>
  );
}
