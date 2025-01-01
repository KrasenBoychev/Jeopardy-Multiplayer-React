import { useState } from "react";
import { useGameContext } from "../../../../contexts/GameContext";
import StartingPlayer from "../startingPlayer/StartingPlayer";
import DotLoader from "react-spinners/DotLoader";
import "./connectPlayers.css";

export default function ConnectPlayers() {
  const { channel, rivalPlayer } = useGameContext();

  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return (
      <div className="game-container">
        <div className="connect-players-wrapper">
          <p>Waiting for {rivalPlayer} to join...</p>
          <DotLoader />
        </div>
      </div>
    );
  }

  return <StartingPlayer />;
}
