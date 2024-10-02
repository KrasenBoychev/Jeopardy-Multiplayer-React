import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { adminId } from "../../common/credentials.js";

import "./header.css";

import LeaveGame from "../leaveGame/LeaveGame";

export default function Header(props) {
  const { isAuthenticated, username, userId } = useAuthContext();

  const { isGame, setIsGame } = props.game;
  const client = props.client;

  return (
    <header>
      <nav>
        <ul className="logo">
          <li>Welcome, {isAuthenticated ? username : "guest"}</li>
        </ul>

        {isGame ? (
          <ul className="profile">
            <li>
              <LeaveGame
                game={{ isGame, setIsGame }}
                channel={props.channel}
                client={client}
              />
            </li>
          </ul>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </header>
  );
}
