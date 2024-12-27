import { Chat } from "stream-chat-react";

import { useAuthContext } from "../../contexts/AuthContext";
import usePlay from "../../hooks/usePlay";

import JoinGame from "./joinGame/JoinGame";

export default function Play(props) {
  const { isNewGameStarted, setIsNewGameStarted } = props.game;
  const client = props.client;

  const { username } = useAuthContext();

  usePlay(username, setIsNewGameStarted, client);

  return (
    <>
      {isNewGameStarted && (
        <Chat client={client}>
          <JoinGame channel={props.channel} />
        </Chat>
      )}
    </>
  );
}
