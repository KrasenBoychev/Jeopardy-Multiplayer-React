import { useEffect } from "react";
import { updateGameInProgress } from "../../../api/user-api";
import { useAuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function useNewGameStarted(
  socket,
  friendsList,
  isNewGameStarted,
) {
  const { username } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNewGameStarted) {
      (async function newGameStarted() {
        const gameInProgressValue = true;
        await changeGameInProgress(
          socket,
          friendsList,
          username,
          gameInProgressValue,
          navigate,
          location
        );
      })();
    }
  }, [isNewGameStarted]);
}

export async function changeGameInProgress(
  socket,
  friendsList,
  username,
  gameInProgressValue,
  navigate,
  location
) {
  await updateGameInProgress();

  const receiverFriends = friendsList.filter((friend) => friend.online);

  await socket.emit("sendUserStatus", {
    senderInfo: { username, gameInProgress: gameInProgressValue },
    receiverFriends,
    action: "changeGameInProgress",
  });

  if (location && location.pathname != "/play") {
    navigate("/play");
  }
}
