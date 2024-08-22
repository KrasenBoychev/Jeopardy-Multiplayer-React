

import { Chat } from "stream-chat-react";

import JoinGame from "./joinGame/JoinGame";
import { useAuthContext } from "../../contexts/AuthContext";
import usePlay from "../../hooks/usePlay";

export default function Play({ props }) {
  const { isAuth, setIsAuth, client } = props;

  const { username } = useAuthContext();

  usePlay(username, setIsAuth, client);

  return (
    <>
      {isAuth && (
        <Chat client={client}>
          <JoinGame />
        </Chat>
      )}
    </>
  );
}
