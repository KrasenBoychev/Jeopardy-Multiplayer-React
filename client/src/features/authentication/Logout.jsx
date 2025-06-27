import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { deleteCredentials, selectCurrentUser } from "./authSlice";
import { useLogOutMutation } from "./authApiSlice";
import { useChangeOnlineStatusMutation } from "../socket_connection/socketApiSlice";
import { useGetOnlineFriendsMutation } from "../game/01. play_page/friends_list/friendsApiSlice";
import Loader from "../../components/Loader";

export default function Logout({ socket }) {
  const user = useSelector(selectCurrentUser);
  const [logOut, { isSuccess }] = useLogOutMutation();
  const [changeOnlineStatus] = useChangeOnlineStatusMutation();
  const [getOnlineFriends] = useGetOnlineFriendsMutation();
  const dispatch = useDispatch();

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

        localStorage.removeItem("auth");
        await logOut();
        dispatch(deleteCredentials());
      } catch (err) {
        toast.error("Logout Failed. Please refresh the page");
      }
    })();
  }, []);

  return <>{!isSuccess ? <Loader /> : <Navigate to="/" />}</>;
}
