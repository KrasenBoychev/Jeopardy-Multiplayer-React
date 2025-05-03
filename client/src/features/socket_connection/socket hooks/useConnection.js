import { io } from "socket.io-client";
import { baseURL } from "../../../app/api/baseURL";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  updateOnlineStatus,
} from "../../authentication/authSlice";
import { useChangeOnlineStatusMutation } from "../socketApiSlice";
import { useGetFriendsDetailsMutation } from "../../game/01. play_page/children/friendsList/friendsApiSlice";
import {
  deleteFriends,
  setFriends,
} from "../../game/01. play_page/children/friendsList/friendsSlice";
import { deleteSocket } from "../socketSlice";

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

      const getFriendsServerRes = await getFriendsDetails(
        user.gameDetails.friendsList
      );
      const friendsList = getFriendsServerRes.data;

      if (friendsList) {
        console.log(friendsList);

        dispatch(setFriends(friendsList));

        const onlineFriends = friendsList.filter(
          (friend) => friend.online === true
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
