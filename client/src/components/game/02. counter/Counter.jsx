import { useState } from "react";
import StartingPlayer from "../03. starting_player/StartingPlayer";
import "./counter.css";
import "../game.css";

export default function Counter() {
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
    <div className="game_container">
      {gameReady ? (
        <StartingPlayer />
      ) : (
        <p className="player_counter">{counter}</p>
      )}
    </div>
  );
}
