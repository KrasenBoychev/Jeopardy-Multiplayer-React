import { useState } from "react";
import { useGameContext } from "../../../contexts/GameContext";
import { useExitGame } from "../../../hooks/game_hooks/useExitGame";
import Confrim from "./confirm/Confrim";
import "./exit.css";

export default function ExitGame({ props }) {
  const {
    friendsList,
    setFriendInvited,
    gameRoomName,
    setGameRoomName,
    setRenderStartingPlayer,
    setIsNewGameStarted,
  } = props;
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [isGameLeft, setIsGameLeft] = useState(false);
  const [leavingTimeout, setLeavingTimeout] = useState(0);
  const { socket } = useGameContext();

  useExitGame(
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
  );

  const leaveGameClickHandler = () => {
    setShowConfirmMessage(true);
  };

  return (
    <>
      <div className="exit-game-container">
        <p onClick={leaveGameClickHandler}>Exit Game</p>
      </div>

      {showConfirmMessage && (
        <Confrim
          props={{
            setShowConfirmMessage,
            gameRoomName,
            setIsGameLeft,
          }}
        />
      )}
    </>
  );
}
