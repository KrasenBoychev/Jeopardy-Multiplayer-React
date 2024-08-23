import { useState } from "react";

import StartingPlayer from "../startingPlayer/StartingPlayer";

export default function ConnectPlayers({ channel }) {

  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div>Waiting for other player to join...</div>;
  }

  return <StartingPlayer channel={channel} />;
}
