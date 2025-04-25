import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useGameContext } from "../../../../contexts/GameContext";
import { useEffect, useState } from "react";
import "./confirm.css";

export default function Confrim({ props }) {
  const { setShowConfirmMessage, gameRoomName, setIsGameLeft } = props;
  const { username } = useAuthContext();
  const { socket, friendSocketId } = useGameContext();

  const declineLeaving = () => {
    setShowConfirmMessage(false);
  };

  const confirmLeaving = async () => {
    await socket.emit("setExitGame", {
      receiverSocketId: friendSocketId,
      userUsername: username,
      gameRoomName,
    });
    setIsGameLeft(true);
  };

  return (
    <div className="confirm-wrapper">
      <div className="confirm-message">
        <h2>Are you sure you want to leave the game?</h2>
        <div className="confirm-buttons">
          <button onClick={confirmLeaving}>Yes</button>
          <button onClick={declineLeaving}>No</button>
        </div>
      </div>
    </div>
  );
}
