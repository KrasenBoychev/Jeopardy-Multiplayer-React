import { useState } from "react";
import { useGameContext } from "../../../../contexts/GameContext";
import useStartingPlayer from "../../../../hooks/useStartingPlayer";
import VisualizePlayer from "../visualizePlayer/VisualizePlayer";

import "./startingPlayer.css";
import "../../play.css";


export default function StartingPlayer() {
  const { channel } = useGameContext();

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
    <div className="game-container">
      {gameReady ? (
        <VisualizePlayer players={{ firstPlayer, secondPlayer }} />
      ) : firstPlayer == "" && noGame ? (
        <p className="no-game-created">
          No game created - exit the game and try again
        </p>
      ) : (
        <p className="visualize-player-counter">{counter}</p>
      )}
    </div>
  );
}
