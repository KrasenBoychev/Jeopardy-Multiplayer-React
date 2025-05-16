import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCredentials, selectCurrentUser } from "./authSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLogOutMutation } from "./authApiSlice";
import { useChangeOnlineStatusMutation } from "../socket_connection/socketApiSlice";
import { useGetOnlineFriendsMutation } from "../game/01. play_page/children/friendsList/friendsApiSlice";

export default function Logout({ socket }) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [logOut, { isLoading }] = useLogOutMutation();
  const [changeOnlineStatus] = useChangeOnlineStatusMutation();
  const [getOnlineFriends] = useGetOnlineFriendsMutation();

  useEffect(() => {
    (async function logout() {
      try {
        const getOnlineFriendsServerRes = await getOnlineFriends(
          user.gameDetails.friendsList
        );
        const onlineFriends = getOnlineFriendsServerRes.data;

        if (onlineFriends) {
          socket.emit("sendUserStatus", {
            senderInfo: {
              username: user.username,
              socketId: "",
            },
            receiverFriends: onlineFriends,
          });
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
