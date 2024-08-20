import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

import "./header.css";

export default function Header() {
  const { isAuthenticated, username } = useAuthContext();

  return (
    <nav>
      <ul className="logo">
        <li>Logo</li>
        <li>
           Welcome, {isAuthenticated ? username : 'guest'}
        </li>
      </ul>

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
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
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
  );
}
