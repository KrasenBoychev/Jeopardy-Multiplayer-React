import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { sendUpdateToOnlineFriends } from "../../hooks/useSocket";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function Logout(props) {
  const { socket, setSocket } = props.socketProps;
  const { friendsList, setFriendsList } = props.friendsProps;

  const { username } = useAuthContext();
  const logout = useLogout();
  const action = "logout";

  useEffect(() => {
    (async function logoutUser() {
      await sendUpdateToOnlineFriends(socket, username, friendsList, action);
      await socket.disconnect();
      setSocket(null);
      logout();
    })();
  }, []);

  return <Navigate to="/" />;
}
