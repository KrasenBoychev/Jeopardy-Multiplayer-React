import useLeaveGame from "../../../hooks/useLeaveGame";
import { useGameContext } from "../../../contexts/GameContext";
import Confrim from "./confirm/Confrim";
import "./exit.css";

export default function ExitGame() {
  const { channel, setChannel, client, setIsNewGameStarted } = useGameContext();

  const [
    setLeave,
    setDisconnect,
    setLeavingPlayer,
    showConfirmMessage,
    setShowConfirmMessage,
    navigate,
  ] = useLeaveGame(setIsNewGameStarted, channel, setChannel, client);

  const leavePage = async () => {
    if (channel) {
      setShowConfirmMessage(true);
    } else {
      client.disconnectUser();
      setLeave(true);
      navigate("/");
    }
  };

  const confirmLeaving = async () => {
    setLeavingPlayer(client.user.name);

    await channel.sendEvent({
      type: "leave-game",
    });
  };

  const declineLeaving = () => {
    setShowConfirmMessage(false);
  };

  if (channel) {
    channel.on((event) => {
      if (event.type == "leave-game") {
        setDisconnect(true);
      }
    });
  }
  return (
    <>
      <div className="exit-game-container">
        <p onClick={leavePage}>Exit Game</p>
      </div>

      {showConfirmMessage && (
        <Confrim
          props={{
            confirmLeaving,
            declineLeaving,
          }}
        />
      )}
    </>
  );
}
