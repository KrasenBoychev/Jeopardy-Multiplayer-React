import React, { useState } from "react";

import { useChatContext } from "stream-chat-react";

import Game from "../game/Game";

export default function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();
  
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Game channel={channel} setChannel={setChannel} />
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}> Join/Start Game</button>
        </div>
      )}
    </>
  );
}
