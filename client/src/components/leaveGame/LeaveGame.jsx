import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
      await channel.stopWatching();
      setChannel(null);
    }

    client.disconnectUser();
    setLeave(true);
    naigate("/");
  };

  return <button onClick={leavePage}>LeavePage</button>;
}
