import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../features/authentication/authSlice";

export default function Footer() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return (
    <footer
      className="absolute w-full flex
     bottom-0 right-0 p-[5px] uppercase font-bold text-white"
    >
      <div className="flex-1 text-center z-10 text-[14px] max-[1600px]:text-[12px] max-[1400px]:text-[10px]">
        {!user && location.pathname == "/about" ? (
          <Link to={"/"} className="cursor-pointer hover:underline">
            Back to Home Page
          </Link>
        ) : (
          <Link to={"/about"} className="cursor-pointer hover:underline">
            Game Rules
          </Link>
        )}
      </div>
      <div className="absolute right-2 self-end text-[11px] max-[1600px]:text-[9px] max-[1400px]:text-[7px]">
        &copy; Jeopardy 2024 created by Krasen Boychev
      </div>
    </footer>
  );
}
