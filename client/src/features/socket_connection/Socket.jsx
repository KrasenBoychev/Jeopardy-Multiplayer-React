import { socket } from "../../app/socket";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../authentication/authSlice";
import { useChangeOnlineStatusMutation } from "./socketSlice";

export default function Socket({ isUserAuthenticated }) {
  // const [socketConnected, setSocketConnected] = useState(socket.connected);
  // console.log(socket);

  const user = useSelector(selectCurrentUser);

  const [changeOnlineStatus, { isLoading }] = useChangeOnlineStatusMutation();

  useEffect(() => {
    if (user) {
      socket.connect();

      socket.on("connect", addOnlineUser);

      async function addOnlineUser() {
        try {
          await changeOnlineStatus();

          console.log("status changed");

          // after the User model is changed, the server services have to be updated
          // const friendsListResponse = await getUserFriendsAndTheirStatus();
          // setFriendsList(friendsListResponse);

          //   const action = "friendIsOnline";
          //   await sendUpdateToOnlineFriends(
          //     socket,
          //     username,
          //     friendsListResponse,
          //     action
          //   );
        } catch (error) {
          toast.error(error.message);
        }
      }
      console.log("socket connected");
    }

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
      console.log("socket disconnected");
    };
  }, [user]);

  // useSocket();
  // useNewGameStarted(socket, friendsList, isNewGameStarted);
  return;
}
