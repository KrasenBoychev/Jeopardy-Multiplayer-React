import React, { useState } from "react";
import toast from "react-hot-toast";

import { Channel, useChatContext } from "stream-chat-react";

import { useAuthContext } from "../../../contexts/AuthContext";

import Game from "../game/Game";

export default function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();
  const { username } = useAuthContext();

  const createChannel = async () => {
    try {
      const rivalPlayer = await client.queryUsers({
        name: { $eq: rivalUsername },
      });

      if (rivalPlayer.users[0].name === username) {
        toast.error("Rival name can not be the same as your username");
        return;
      }

      if (rivalPlayer.users.length === 0) {
        alert(`${rivalUsername} not found`);
        return;
      }
      
      const newChannel = client.channel("messaging", {
        members: [client.userID, rivalPlayer.users[0].id],
      });

      await newChannel.watch();
      setChannel(newChannel);
    } catch (error) {
      return toast.error(error.message);
    }
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
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
