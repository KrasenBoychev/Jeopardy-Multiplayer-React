import React, { useState } from "react";
import toast from "react-hot-toast";
import { Channel, useChatContext } from "stream-chat-react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import ConnectPlayers from "../connectPlayers/ConnectPlayers";

import "./joinGame.css";
import "../../play.css";

export default function JoinGame(props) {
  const [rivalUsername, setRivalUsername] = useState("");
  const { channel, setChannel } = props.channel;
  const { client } = useChatContext();
  const { username } = useAuthContext();

  const createChannel = async () => {
    try {
      const rivalPlayer = await client.queryUsers({
        name: { $eq: rivalUsername },
      });

      if (rivalPlayer.users.length === 0) {
        toast.error("Rival player not found");
        return;
      }

      if (rivalPlayer.users[0].name === username) {
        toast.error("Rival player can not be you");
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
        <Channel channel={channel} setChannel={setChannel}>
          <ConnectPlayers channel={channel} rivalPlayer={rivalUsername} />
        </Channel>
      ) : (
        <div className="game-container">
          <div className="game-wrapper">
            <h1 className="start-game-heading">Start Game</h1>
            <input
              className="start-game-rival-player"
              placeholder="Username of rival player..."
              onChange={(event) => {
                setRivalUsername(event.target.value);
              }}
            />

            <button className="start-game-button" onClick={createChannel}>
              {" "}
              Join/Start Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}
