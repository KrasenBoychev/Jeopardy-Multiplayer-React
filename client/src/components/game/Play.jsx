import { Chat } from "stream-chat-react";

import { useAuthContext } from "../../contexts/AuthContext";
import usePlay from "../../hooks/usePlay";

import JoinGame from "./joinGame/JoinGame";

export default function Play(props) {
  const { isGame, setIsGame } = props.game;
  const client = props.client;

  const { username } = useAuthContext();

  usePlay(username, setIsGame, client);

  return (
    <>
      {isGame && (
        <Chat client={client}>
          <JoinGame channel={props.channel} />
        </Chat>
      )}
    </>
  );
}
