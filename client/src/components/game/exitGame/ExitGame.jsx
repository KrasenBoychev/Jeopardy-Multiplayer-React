import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../contexts/AuthContext";
import { changeGameInProgress } from "../../../hooks/useNewGameStarted";
import Confrim from "./confirm/Confrim";
import "./exit.css";

export default function ExitGame({ props }) {
  const {
    socket,
    friendsList,
    setFriendInvited,
    gameRoomName,
    setGameRoomName,
    setRenderStartingPlayer,
    setIsNewGameStarted,
    firstPlayer,
    secondPlayer,
  } = props;
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const { username } = useAuthContext();
  const navigate = useNavigate();

  const leaveGameClickHandler = () => {
    setShowConfirmMessage(true);
  };

  useEffect(() => {
    socket?.on("getExitGame", async ({ senderUsername, gameRoomName }) => {
      await socket.emit("leaveRoom", {
        gameRoomName,
      });

      toast.error(
        senderUsername + " exit the game. You will be redirected in 3 seconds"
      );

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
      }, 3000);
    });
  }, [socket]);

  return (
    <>
      <div className="exit-game-container">
        <p onClick={leaveGameClickHandler}>Exit Game</p>
      </div>

      {showConfirmMessage && (
        <Confrim
          props={{
            socket,
            friendsList,
            setShowConfirmMessage,
            setFriendInvited,
            gameRoomName,
            setGameRoomName,
            setRenderStartingPlayer,
            setIsNewGameStarted,
            firstPlayer,
            secondPlayer,
          }}
        />
      )}
    </>
  );
}
