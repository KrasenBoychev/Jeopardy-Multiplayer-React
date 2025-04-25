import "./notFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-wrapper">
      <p className="not-found-msg">Page not found</p>
      <p className="not-found-get-back">
        Get back to{" "}
        <Link to="/" className="not-found-link">
          Home Page
        </Link>
      </p>
    </div>
  );
}
