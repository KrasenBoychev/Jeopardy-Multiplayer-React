import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  updateOnlineStatus,
} from "../../authentication/authSlice";
import {
  useChangeOnlineStatusMutation,
  useGetFriendsDetailsMutation,
} from "../socketApiSlice";
import { setFriends } from "../../game/01. play_page/children/friendsList/friendsSlice";
import { io } from "socket.io-client";
import { baseURL } from "../../../app/api/baseURL";

export default function useConnection(socketProps) {
  const { socket, setSocket } = socketProps;
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [changeOnlineStatus] = useChangeOnlineStatusMutation();
  const [getFriendsDetails] = useGetFriendsDetailsMutation();

  useEffect(() => {
    const newSocket = io(baseURL);
    setSocket(newSocket);

    newSocket.emit("newUserConnected", {});

    return async () => {
      socket?.removeAllListeners();
      socket?.disconnect;
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    socket?.on("setConnectedUser", async () => {
      await changeOnlineStatus({
        username: user.username,
        socketId: socket.id,
      });

      dispatch(updateOnlineStatus(socket.id));

      const friendsList = await getFriendsDetails(user.gameDetails.friendsList);

      if (friendsList.data) {
        dispatch(setFriends(friendsList.data));

        const onlineFriends = friendsList.data.filter(
          (friend) => friend.online == true
        );

        if (onlineFriends.length > 0) {
          socket.emit("sendUserStatus", {
            senderInfo: {
              username: user.username,
              socketId: socket.id,
            },
            receiverFriends: onlineFriends,
            // action,
          });
        }
      }
    });
  }, [socket]);
}
