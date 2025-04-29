import { socket } from "../../app/socket";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  updateOnlineStatus,
} from "../authentication/authSlice";
import {
  useChangeOnlineStatusMutation,
  useGetOnlineFriendsDetailsMutation,
} from "./socketApiSlice";

export default function Socket() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [changeOnlineStatus] = useChangeOnlineStatusMutation();
  const [getOnlineFriendsDetails] = useGetOnlineFriendsDetailsMutation();

  useEffect(() => {
    (async function updateStatus() {
      await changeOnlineStatus({
        username: user.username,
        socketId: socket.id,
      });

      dispatch(updateOnlineStatus(socket.id));

      const onlineFriends = await getOnlineFriendsDetails(
        user.gameDetails.friendsList
      );
      console.log(onlineFriends);
    })();

    return async () => {
      try {
        await changeOnlineStatus({ username: user.username, socketId: "" });
        socket.removeAllListeners();
      } catch (err) {
        toast.error("Can not disconnect the user");
      }
    };
  }, []);

  useEffect(() => {
    // socket.on("connect", addOnlineUser);

    // async function addOnlineUser() {
    //   try {
    //     console.log(user);
    //   } catch (error) {
    //     toast.error(error.message);
    //   }
    // }

    return async () => {};
  }, []);

  // useSocket();
  // useNewGameStarted(socket, friendsList, isNewGameStarted);
  return;
}

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
