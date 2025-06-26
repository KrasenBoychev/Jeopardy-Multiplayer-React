import { useNavigate } from "react-router-dom";
import { Vortex } from "@/components/ui/vortex";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../authentication/authSlice";
import { TopPlayers } from "./TopPlayers";

export function HomePageNotAuth() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const openPageClickHandler = () => {
    navigate("/play");
  };

  return (
    <div className="w-[calc(100%)] mx-auto h-auto overflow-hidden bg-black">
      <Vortex className="flex flex-col items-center justify-center px-2 md:px-10 pt-20 pb-4 w-full h-full">
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center uppercase">
          {user ? `Welcome ${user.username}` : "Jeopardy Multiplayer Game"}
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          {user
            ? `Your Points: ${user.gameDetails.points}`
            : "Beat your opponents with knowledge"}
        </p>
        {!user && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <button
              className="px-15 py-3 bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-200 rounded-lg text-2xl text-white uppercase shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
              onClick={openPageClickHandler}
            >
              Play
            </button>
          </div>
        )}

        {user && <TopPlayers />}
      </Vortex>
    </div>
  );
}
