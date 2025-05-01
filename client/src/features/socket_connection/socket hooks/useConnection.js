import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  selectCurrentUser,
  updateOnlineStatus,
} from "../../authentication/authSlice";
import {
  useChangeOnlineStatusMutation,
  useGetFriendsDetailsMutation,
} from "../socketApiSlice";
import { setFriends } from "../../friendsSlice";

export default function useConnection(socket) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [changeOnlineStatus] = useChangeOnlineStatusMutation();
  const [getFriendsDetails] = useGetFriendsDetailsMutation();

  useEffect(() => {
    socket?.on("connect", async () => {
      await changeOnlineStatus({
        username: user.username,
        socketId: socket.id,
      });

      dispatch(updateOnlineStatus(socket.id));

      const friends = await getFriendsDetails(user.gameDetails.friendsList);

      if (friends.data) {
        dispatch(setFriends(friends.data));

        const onlineFriends = friends.data.filter(
          (friend) => friend.online == true
        );

        if (onlineFriends.length > 0) {
          socket.emit("sendUserStatus", {
            senderInfo: {
              username: user.username,
              socketId: user.gameDetails.socketId,
            },
            receiverFriends: onlineFriends,
            // action,
          });
        }
      }
    });

    return async () => {
      try {
        await changeOnlineStatus({ username: user.username, socketId: "" });
      } catch (err) {
        toast.error("Cannot disconnect the user");
      }
      socket.removeAllListeners();
    };
  }, []);
}
