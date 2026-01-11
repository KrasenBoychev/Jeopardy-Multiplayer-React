import { useState } from "react";
import Confrim from "./confirm/Confrim";
import "./exit.css";

export default function ExitGame() {
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const leaveGameClickHandler = () => {
    setShowConfirmMessage(true);
  };

  return (
    <>
      <div className="exit-game-container">
        <p onClick={leaveGameClickHandler}>Exit Game</p>
      </div>

      {showConfirmMessage && (
        <Confrim setShowConfirmMessage={setShowConfirmMessage} />
      )}
    </>
  );
}
