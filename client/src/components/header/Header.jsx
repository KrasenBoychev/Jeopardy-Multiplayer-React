import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
// import { adminId } from "../../common/credentials";

import "./header.css";
import { socket } from "../../app/socket";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authentication/authSlice";

export default function Header() {
  // const { isAuthenticated, username, userId } = useAuthContext();
  const location = useLocation();

  const [currLocation, setCurrLocation] = useState(null);

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location]);

  return (
    <header>
      <nav>
        <ul className="logo">
          <li>Welcome, {user ? user.username : "guest"}</li>
        </ul>

        <ul className="profile">
          <li>
            <NavLink
              to="/"
              className={currLocation == "/" ? "header_active_link" : ""}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={currLocation == "/about" ? "header_active_link" : ""}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/play"
              className={currLocation == "/play" ? "header_active_link" : ""}
            >
              Play
            </NavLink>
          </li>
          {/* {userId == adminId && (
            <li>
              <NavLink
                to="/create"
                className={
                  currLocation == "/create" ? "header_active_link" : ""
                }
              >
                Create
              </NavLink>
            </li>
          )} */}

          {user ? (
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={
                    currLocation == "/login" ? "header_active_link" : ""
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={
                    currLocation == "/register" ? "header_active_link" : ""
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
