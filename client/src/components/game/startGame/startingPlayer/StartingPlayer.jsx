import { useState } from "react";
import useStartingPlayer from "../../../../hooks/useStartingPlayer";

import "./startingPlayer.css";

import VisualizePlayer from "../visualizePlayer/VisualizePlayer";

export default function StartingPlayer({ channel }) {
  const [counter, firstPlayer, secondPlayer] = useStartingPlayer(channel);

  const [noGame, setNoGame] = useState(false);
  const [gameReady, setGameReady] = useState(false);

  if (counter == 1) {
    setTimeout(() => {
      if (firstPlayer) {
        setGameReady(true);
      } else {
        setNoGame(true);
      }
    }, 1000);
  }

  return (
    <div className="gameContainer">
      {gameReady ? (
        <VisualizePlayer players={{ firstPlayer, secondPlayer }} />
      ) : firstPlayer == '' && noGame ? (
        <p>No game created</p>
      ) : (
        <p className="visualize-player-counter">{counter}</p>
      )}
    </div>
  );
}
