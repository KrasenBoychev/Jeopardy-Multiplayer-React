import { useState } from "react";
import StartingPlayer from "../startingPlayer/StartingPlayer";
import "./connectPlayers.css";
import DotLoader from "react-spinners/DotLoader";

export default function ConnectPlayers(props) {
  const channel = props.channel;
  const rivalPlayer = props.rivalPlayer;

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

  return <StartingPlayer channel={channel} />;
}
