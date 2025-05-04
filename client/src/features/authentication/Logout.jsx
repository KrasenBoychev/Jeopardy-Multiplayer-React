import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCredentials, selectCurrentUser } from "./authSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLogOutMutation } from "./authApiSlice";
import { selectFriends } from "../game/01. play_page/children/friendsList/friendsSlice";
import { useChangeOnlineStatusMutation } from "../socket_connection/socketApiSlice";

export default function Logout({ socket }) {
  const [logOut, { isLoading }] = useLogOutMutation();
  const dispatch = useDispatch();
  const [changeOnlineStatus] = useChangeOnlineStatusMutation();
  const friends = useSelector(selectFriends);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    (async function logout() {
      try {
        if (friends.length > 0) {
          const onlineFriends = friends.filter(
            (friend) => friend.online === true
          );

          if (onlineFriends.length > 0) {
            socket.emit("sendUserStatus", {
              senderInfo: {
                username: user.username,
                socketId: "",
              },
              receiverFriends: onlineFriends,
            });
          }
        }

        await changeOnlineStatus({ username: user.username, socketId: "" });

        await logOut();
        dispatch(deleteCredentials());
      } catch (err) {
        toast.error("Logout Failed");
      }
    })();
  }, []);

  return <Navigate to="/" />;
}
