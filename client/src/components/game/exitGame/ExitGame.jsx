import useLeaveGame from "../../../hooks/useLeaveGame";
import Confrim from "./confirm/Confrim";
import "./exit.css";

export default function ExitGame(props) {
  const { isNewGameStarted, setIsNewGameStarted } = props.game;
  const { channel, setChannel } = props.channel;
  const client = props.client;

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
