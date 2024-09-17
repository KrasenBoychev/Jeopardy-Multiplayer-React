import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function LeaveGame(props) {
  const [leave, setLeave] = useState(false);
  const naigate = useNavigate();

  const { isAuth, setIsAuth } = props.auth;
  const { channel, setChannel } = props.channel;
  const client = props.client;

  const [disconnect, setDisconnect] = useState(false);

  useEffect(() => {
    (async function setLeaveState() {
      if (disconnect) {
        await channel.stopWatching();
        setChannel(null);

        client.disconnectUser();
        setIsAuth(false);
        naigate("/");
      } else {
        if (leave) {
          setIsAuth(false);
        }
      }
    })();
  }, [leave, disconnect]);

  const leavePage = async () => {
    if (channel) {
      await channel.sendEvent({
        type: "set-error",
      });
    } else {
      client.disconnectUser();
      setLeave(true);
      naigate("/");
    }
  };

  if (channel) {
    channel.on(async (event) => {
      if (event.type == "set-error") {
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

      {/* {channel && (
        <p color={channel.state.wather_count == 2 ? "green" : "red"}>
          Rival Player: 
          {channel.state.watcher_count == 2 ? " connected" : " disconnected"}
        </p>
      )} */}
    </>
  );
}
