import { useState } from "react";
import StartingPlayer from "../03. starting_player/StartingPlayer";
import "./counter.css";
import "../game.css";

export default function Counter({ props }) {
  const { firstPlayer, secondPlayer } = props;
  const [gameReady, setGameReady] = useState(false);
  const [counter, setCounter] = useState(3);

  const timer = setTimeout(() => {
    if (counter == 1) {
      clearTimeout(timer);
      setGameReady(true);
    } else {
      setCounter((oldCount) => oldCount - 1);
    }
  }, 1000);

  return (
    <div className="game-container">
      {gameReady ? (
        <StartingPlayer players={{ firstPlayer, secondPlayer }} />
      ) : (
        <p className="visualize-player-counter">{counter}</p>
      )}
    </div>
  );
}
