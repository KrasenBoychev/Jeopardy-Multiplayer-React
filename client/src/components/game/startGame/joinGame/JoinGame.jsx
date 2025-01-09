import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { GameContext } from "../../../../contexts/GameContext";
import usePlay from "../../../../hooks/usePlay";

import ConnectPlayers from "../connectPlayers/ConnectPlayers";
import ExitGame from "../../exitGame/ExitGame";

import "./joinGame.css";
import "../../play.css";

export default function JoinGame(props) {
  const { isNewGameStarted, setIsNewGameStarted } = props.game;
  const [rivalUsername, setRivalUsername] = useState("");
  const [channel, setChannel] = useState(null);
  
  const { username } = useAuthContext();
  const client = usePlay(username);  

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

      const gameId = Date.now();

      const newChannel = client.channel("messaging", gameId, {
        members: [client.userID, rivalPlayer.users[0].id],
      });

      await newChannel.watch();
      setChannel(newChannel);

      setIsNewGameStarted(true);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <>
      {channel ? (
        <GameContext.Provider
          value={{
            channel,
            setChannel,
            client,
            rivalPlayer: rivalUsername,
            isNewGameStarted,
            setIsNewGameStarted,
          }}
        >
          <ExitGame />
          <ConnectPlayers />
        </GameContext.Provider>
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
