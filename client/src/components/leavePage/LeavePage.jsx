import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeavePage({props}) {
    const [leave, setLeave] = useState(false);
    const naigate = useNavigate();

    useEffect(() => {
        (function setLeaveState() {
            if (leave) {
                props.setIsAuth(false);
            }
        })();
    }, [leave]);

    const leavePage = () => {
        props.client.disconnectUser();
        setLeave(true);
        naigate('/');
    };

  return (
    <button onClick={leavePage}>LeavePage</button>
  )
}
