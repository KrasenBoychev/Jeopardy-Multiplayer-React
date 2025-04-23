import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { sendUpdateToOnlineFriends } from "../../hooks/useSocket";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { socket } from "../../app/socket";
import toast from "react-hot-toast";
import { deleteUserInOnlineUsers } from "../../../api/user-api";

export default function Logout(props) {
  // const { socket, setSocket } = props.socketProps;
  const { friendsList, setFriendsList } = props.friendsProps;
  const { setFriendInvited } = props.setFriendInvited;
  const setIsUserAuthenticated = props.setIsUserAuthenticated;

  const { username } = useAuthContext();
  const logout = useLogout(setIsUserAuthenticated);
  const action = "friendIsOffline";

  useEffect(() => {
    (async function logoutUser() {
      try {
        await deleteUserInOnlineUsers();

        setFriendInvited(null);
        logout();
      } catch (error) {
        toast.error(error.message);
      }
      // await sendUpdateToOnlineFriends(socket, username, friendsList, action);
      // socket.disconnect();
      // setSocket(null);
    })();
  }, []);

  return <Navigate to="/" />;
}
