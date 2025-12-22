import { Vortex } from "@/components/ui/vortex";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../authentication/authSlice";
import { TopPlayers } from "./TopPlayers";
import { Link } from "react-router-dom";

export default function HomePageAuth() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 md:px-10 pb-4 bg-[url(world_map.png)] max-h-full bg-cover bg-center">
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-white mt-10 w-full text-2xl md:text-6xl font-bold text-center uppercase tracking-wider [word-spacing:8px] font-[Pacifico]">
          Welcome {user.username}
        </h2>

        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center uppercase bg-black p-3 rounded-lg">
          {user.gameDetails.points} game points
        </p>
      </section>
      <section className="flex-1 flex items-center justify-center w-full max-h-full">
        <div className="flex flex-1 content-center max-h-full">
          <TopPlayers />
        </div>
        <div className="flex flex-1">
          <button className="flex-1 flex-col content-center justify-center">
            <Link to="/play" className="text-white">
              Play
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}
