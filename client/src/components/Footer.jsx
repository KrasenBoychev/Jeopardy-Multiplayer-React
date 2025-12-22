import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="absolute w-full flex
     bottom-0 right-0 p-[5px] uppercase font-bold text-[10px] text-white"
    >
      <div className="flex-1 text-center z-10">
        <Link to={"/about"} className="cursor-pointer hover:underline">
          Rules for the game
        </Link>
      </div>
      <div className="absolute right-2">
        &copy; Jeopardy 2024 created by Krasen Boychev
      </div>
    </footer>
  );
}
