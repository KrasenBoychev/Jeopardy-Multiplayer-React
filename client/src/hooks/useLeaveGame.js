import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLeaveGame(setIsGame, channel, setChannel, client) {
  const [leave, setLeave] = useState(false);
  const [disconnect, setDisconnect] = useState(false);
  const [leavingPlayer, setLeavingPlayer] = useState("");
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async function setLeaveState() {
      if (disconnect) {
        if (leavingPlayer == client.user.name) {
          disconnectUser(channel, setChannel, client, setIsGame, navigate);
        } else {
          toast.error(
            "Rival Player disconnected - you will be redirected in 3 seconds"
          );
          setTimeout(async () => {
            disconnectUser(channel, setChannel, client, setIsGame, navigate);
          }, 3000);
        }
      } else {
        if (leave) {
          setIsGame(false);
        }
      }
    })();
  }, [leave, disconnect]);

  return [
    setLeave,
    setDisconnect,
    setLeavingPlayer,
    showConfirmMessage,
    setShowConfirmMessage,
    navigate,
  ];
}

async function disconnectUser(
  channel,
  setChannel,
  client,
  setIsGame,
  navigate
) {
  await channel.stopWatching();
  setChannel(null);
  client.disconnectUser();
  setIsGame(false);
  navigate("/");
}
