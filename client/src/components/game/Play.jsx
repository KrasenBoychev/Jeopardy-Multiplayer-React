import { useEffect } from "react";

import { Chat } from "stream-chat-react";

import { useAuthContext } from "../../contexts/AuthContext";

import JoinGame from "./joinGame/JoinGame";

export default function Play({ props }) {
  const userData = useAuthContext();

  const { isAuth, setIsAuth, client } = props;

  useEffect(() => {
    (function setClient() {
      if (userData.gameToken) {
        const { userId, username, gameToken } = userData;

        client.connectUser(
          {
            id: userId,
            username,
          },
          gameToken
        );

        setIsAuth(true);
      }
    })();
  }, [userData.gameToken]);

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
