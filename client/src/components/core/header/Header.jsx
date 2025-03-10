import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext.jsx";
import { adminId } from "../../../common/credentials.js";

import NotificationsBox from "./notificationsBox/NotificationsBox.jsx";
import "./header.css";
import "./NotificationsBox/notificationsBox.css";

export default function Header({ socket }) {
  const { isAuthenticated, username, userId } = useAuthContext();
  const [notificationsBox, setNotificationsBox] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);

  const openNotifications = () => {
    setNotificationsBox(!notificationsBox);
  };

  useEffect(() => {
    socket?.on("getNotification", ({ msg }) => {      
      setNotificationsList((prevList) => [...prevList, msg]);
    });
  }, [socket]);

  return (
    <header>
      <nav>
        <ul className="logo">
          <li>Welcome, {isAuthenticated ? username : "guest"}</li>
        </ul>

        <ul className="profile">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/play">Play</NavLink>
          </li>
          {userId == adminId && (
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>
          )}

          {isAuthenticated ? (
            <>
              <li
                className="header_game_invitations"
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
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      {notificationsBox && <NotificationsBox notificationsList={notificationsList} />}
    </header>
  );
}
