import { Chat } from "stream-chat-react";

import { useAuthContext } from "../../contexts/AuthContext";
import usePlay from "../../hooks/usePlay";

import JoinGame from "./joinGame/JoinGame";

export default function Play(props) {
  const { isAuth, setIsAuth } = props.auth;
  const client = props.client;

  const { username } = useAuthContext();

  usePlay(username, setIsAuth, client);

  return (
    <>
      {isAuth && (
        <Chat client={client}>
          <JoinGame channel={props.channel} />
        </Chat>
      )}
    </>
  );
}
