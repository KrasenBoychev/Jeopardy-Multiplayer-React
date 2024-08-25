import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeaveGame(props) {
  const [leave, setLeave] = useState(false);
  const naigate = useNavigate();

  const { isAuth, setIsAuth } = props.auth;
  const { channel, setChannel } = props.channel;
  const client = props.client;

  useEffect(() => {
    (async function setLeaveState() {
      if (leave) {
        setIsAuth(false);
      }
    })();
  }, [leave]);

  const leavePage = async () => {
    if (channel) {
      // await channel.sendEvent({
      //   type: "set-error",
      //   data: { props },
      // });

      await channel.stopWatching();
      setChannel(null);
    }

    client.disconnectUser();
    setLeave(true);
    naigate("/");
  };

  // if (channel) {
  //   channel.on(async (event) => {
  //     if (event.type == "set-error") {
  //       await channel.stopWatching();
  //       setChannel(null);

  //       client.disconnectUser();
  //       setLeave(true);
  //       naigate("/");
  //     }
  //   });
  // }

  return (
    <>
      <button onClick={leavePage}>LeavePage</button>
      {/* {channel && (
        <p color={channel.state.wather_count == 2 ? "green" : "red"}>
          Rival Player: 
          {channel.state.watcher_count == 2 ? " connected" : " disconnected"}
        </p>
      )} */}
    </>
  );
}
