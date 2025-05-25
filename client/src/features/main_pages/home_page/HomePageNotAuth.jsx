import { useNavigate } from "react-router-dom";
import { Vortex } from "@/components/ui/vortex";

export function HomePageNotAuth() {
  const navigate = useNavigate();

  const openPageClickHandler = () => {
    navigate("/play");
  };

  return (
    <div className="w-[calc(100%)] mx-auto h-[] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center uppercase">
          Jeopardy Multiplayer Game
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Beat your opponents with knowledge
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            className="px-15 py-3 bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-200 rounded-lg text-2xl text-white uppercase shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
            onClick={openPageClickHandler}
          >
            Play
          </button>
        </div>
      </Vortex>
    </div>
  );
}
