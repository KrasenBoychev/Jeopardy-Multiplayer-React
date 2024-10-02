import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import useLeaveGame from "../../hooks/useLeaveGame";

import Confrim from "./confirm/Confrim";

export default function LeaveGame(props) {
  const { isGame, setIsGame } = props.game;
  const { channel, setChannel } = props.channel;
  const client = props.client;

  const [
    setLeave,
    setDisconnect,
    setLeavingPlayer,
    showConfirmMessage,
    setShowConfirmMessage,
    navigate
  ] = useLeaveGame(setIsGame, channel, setChannel, client);

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
      <ul className="profile">
        <li onClick={leavePage}>
          <NavLink>Leave Game</NavLink>
        </li>
      </ul>

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
