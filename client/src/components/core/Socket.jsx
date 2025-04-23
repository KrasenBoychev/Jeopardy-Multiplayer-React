import useNewGameStarted from "../../hooks/game_hooks/useNewGameStarted";
import useSocket, { sendUpdateToOnlineFriends } from "../../hooks/useSocket";
import { useAuthContext } from "../../contexts/AuthContext";
import { socket } from "../../app/socket";
import { useEffect } from "react";
// import { recordUserInOnlineUsers } from "../../../api/user-api";
import { getUserFriendsAndTheirStatus } from "../../../api/friends-api";
import toast from "react-hot-toast";
import { useRecordUserInOnlineUsersMutation } from "../../slices/userSlice";

export default function Socket({ isUserAuthenticated }) {
  // const { friendsList, setFriendsList } = props.friendsProps;
  // const { setNotificationsList } = props.setNotificationsList;
  // const { isNewGameStarted } = props.newGameStartedProps;

  const { username } = useAuthContext();
  const [recordUserInOnlineUsers, { isLoading }] =
    useRecordUserInOnlineUsersMutation();

  useEffect(() => {
    if (isUserAuthenticated) {
      socket.connect();
    }

    async function addOnlineUser() {
      try {
        await recordUserInOnlineUsers({ username, socketId: socket.id }).unwrap();

        // after the User model is changed, the server services have to be updated
        const friendsListResponse = await getUserFriendsAndTheirStatus();
        // setFriendsList(friendsListResponse);

        const action = "friendIsOnline";
        await sendUpdateToOnlineFriends(
          socket,
          username,
          friendsListResponse,
          action
        );
      } catch (error) {
        toast.error(error.message);
      }
    }

    socket.on("connect", addOnlineUser);

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [isUserAuthenticated]);

  // useSocket();
  // useNewGameStarted(socket, friendsList, isNewGameStarted);
  return;
}
