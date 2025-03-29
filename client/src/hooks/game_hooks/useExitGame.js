import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";
import { changeGameInProgress } from "./useNewGameStarted";

export const useExitGame = async (
  socket,
  leavingTimeout,
  setLeavingTimeout,
  isGameLeft,
  setIsGameLeft,
  friendsList,
  setRenderStartingPlayer,
  setGameRoomName,
  setFriendInvited,
  setIsNewGameStarted
) => {
  const { username } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on("getExitGame", async ({ senderUsername, gameRoomName }) => {
      await socket.emit("leaveRoom", {
        gameRoomName,
      });

      toast.error(
        senderUsername + " exit the game. You will be redirected in 3 seconds"
      );

      setLeavingTimeout(3000);
      setIsGameLeft(true);
    });
  }, [socket]);

  useEffect(() => {
    if (isGameLeft) {
      setTimeout(async () => {
        const gameInProgressValue = false;
        await changeGameInProgress(
          socket,
          friendsList,
          username,
          gameInProgressValue,
          navigate,
          null
        );

        setRenderStartingPlayer(false);
        setGameRoomName(null);
        setFriendInvited(null);
        setIsNewGameStarted(false);
        window.location.reload();
        navigate("/play");
      }, leavingTimeout);
    }
  }, [isGameLeft]);
};
