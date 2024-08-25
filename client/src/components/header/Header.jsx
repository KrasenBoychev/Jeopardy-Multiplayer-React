import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { adminId } from "../../common/credentials.js";

import "./header.css";

import LeaveGame from "../leaveGame/LeaveGame";


export default function Header(props) {
  const { isAuthenticated, username, userId } = useAuthContext();

  const { isAuth, setIsAuth } = props.auth;
  const client = props.client;

  // useEffect(() => {
  //   (function checkConnection() {
  //     if (props.channel.channel && props.channel.channel.state.watcher_count < 2) {
  //       setError(true);
  //     }
  //   })();
  // }, [props.channel.channel]);

  return (
    <header>
      <nav>
        <ul className="logo">
          <li>Logo</li>
          <li>Welcome, {isAuthenticated ? username : "guest"}</li>
        </ul>

        {isAuth ? (
          <ul className="profile">
            {/* {props.channel.channel && (
              <li className={error ? "disconnected" : "connected"}>
                Rival Player:
                {error ? " disconnected" : " connected"}
              </li>
            )} */}
            <li>
              <LeaveGame
                auth={{ isAuth, setIsAuth }}
                channel={props.channel}
                client={client}
                // setError={setError}
              />
            </li>
          </ul>
        ) : (
          <>
            <ul className="points">
              {isAuthenticated && (
                <>
                  <li>Points won today: e.g. 1000</li>
                  <li>My Rating: e.g. 8.5</li>
                </>
              )}
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
          </>
        )}
      </nav>
    </header>
  );
}
