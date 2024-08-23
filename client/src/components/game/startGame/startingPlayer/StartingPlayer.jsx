import { useState } from "react";
import useStartingPlayer from "../../../../hooks/useStartingPlayer";
import toast from "react-hot-toast";

export default function StartingPlayer({ channel }) {
  const [counter, startingPlayer] = useStartingPlayer(channel);

  const [noGame, setNoGame] = useState(false);
  const [gameReady, setGameReady] = useState(false);

  if (counter == 1) {
    setTimeout(() => {
      if (startingPlayer) {
        setGameReady(true);
      } else {
        setNoGame(true);
      }
    }, 1000);
  }

  return (
    <div className="gameContainer">
      {gameReady ? (
        <p>{startingPlayer}</p>
      ) : !startingPlayer && noGame ? (
        <p>No game created</p>
      ) : (
        <p>{counter}</p>
      )}

      {counter < 1 && <p>No game created</p>}
    </div>
  );
}
