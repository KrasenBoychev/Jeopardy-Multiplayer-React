import { useState } from "react";

import './connectPlayers.css'

import StartingPlayer from "../startingPlayer/StartingPlayer";

export default function ConnectPlayers({ channel }) {

  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div className="waiting-to-join">Waiting for the rival player to join...</div>;
  }

  return <StartingPlayer channel={channel} />;
}
