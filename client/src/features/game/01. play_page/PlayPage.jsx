import { useSelector } from "react-redux";
import { selectIsNewGameStarted, selectReadyToPlay } from "../gameSlice";
import { LoadingGame } from "./LoadingGame";
import StartingPlayer from "../02. starting_player/StartingPlayer";
import FriendsList from "./friends_list/FriendsList";
import { GameCard } from "./game_room/GameCard";

export default function PlayPage() {
  const readyToPlay = useSelector(selectReadyToPlay);
  const isNewGameStarted = useSelector(selectIsNewGameStarted);

  return (
    <>
      {!readyToPlay ? (
        <div className="flex-1 flex flex-col bg-[url(room.png)] bg-cover bg-center">
          {isNewGameStarted ? (
            <LoadingGame />
          ) : (
            <>
              <div className="flex-1"></div>
              <div className="flex-1 flex gap-110 pb-8 max-[1600px]:gap-95 max-[1400px]:gap-80">
                <FriendsList />
                <GameCard />
              </div>
            </>
          )}
        </div>
      ) : (
        <StartingPlayer />
      )}
    </>
  );
}
