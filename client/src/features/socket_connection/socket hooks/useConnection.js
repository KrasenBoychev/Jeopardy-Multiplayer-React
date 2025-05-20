import { io } from "socket.io-client";
import { baseURL } from "../../../app/api/baseURL";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  updateOnlineStatus,
} from "../../authentication/authSlice";
import { useChangeOnlineStatusMutation } from "../socketApiSlice";
import { useGetOnlineFriendsMutation } from "../../game/01. play_page/children/friends_list/friendsApiSlice";
import {
  deleteFriends,
  setFriends,
} from "../../game/01. play_page/children/friends_list/friendsSlice";
import { deleteSocket } from "../socketSlice";
import { deleteGameDetails } from "../../game/gameSlice";

export default function useConnection(socketProps) {
  const { socket, setSocket } = socketProps;
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [changeOnlineStatus] = useChangeOnlineStatusMutation();
  const [getOnlineFriends] = useGetOnlineFriendsMutation();

  useEffect(() => {
    const newSocket = io(baseURL);
    setSocket(newSocket);

    newSocket.emit("newUserConnected", {});

    return async () => {
      dispatch(deleteGameDetails());
      dispatch(deleteFriends());
      dispatch(deleteSocket());

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

      const getOnlineFriendsServerRes = await getOnlineFriends(
        user.gameDetails.friendsList
      );
      const onlineFriends = getOnlineFriendsServerRes.data;

      if (onlineFriends) {
        socket.emit("sendUserStatus", {
          senderInfo: {
            username: user.username,
            socketId: socket.id,
          },
          receiverFriends: onlineFriends,
        });
      }
    });
  }, [socket]);
}
