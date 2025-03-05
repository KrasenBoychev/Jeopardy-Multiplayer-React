import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext.jsx";
import { adminId } from "../../../common/credentials.js";
import { io } from "socket.io-client";

import "./header.css";

export default function Header({ socketProps }) {
  const { socket, setSocket } = socketProps;
  const { isAuthenticated, username, userId } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      setSocket(io("http://localhost:5000"));
    } else if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    socket?.emit("newUser", username);
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
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
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
    </header>
  );
}
