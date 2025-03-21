import { useEffect } from "react";
import { updateGameInProgress } from "../../api/user-api";
import { useAuthContext } from "../contexts/AuthContext";

export default function useNewGameStarted(
  socket,
  friendsList,
  friendInvited,
  isNewGameStarted
) {
  const { username } = useAuthContext();

  useEffect(() => {
    if (isNewGameStarted) {
      (async function newGameStarts() {
        await updateGameInProgress();

        const receiverFriends = friendsList.filter(
          (friend) =>
            friend.username !== friendInvited &&
            friend.online &&
            !friend.gameInProgress
        );

        await socket.emit("sendUserStatus", {
          senderInfo: { username, gameInProgress: true },
          receiverFriends,
          action: "changeGameInProgress",
        });
      })();
    }
  }, [isNewGameStarted]);
}
