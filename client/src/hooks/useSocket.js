import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  recordUserInOnlineUsers,
  deleteUserInOnlineUsers,
} from "../../api/user-api";

import { getUserFriendsAndTheirStatus } from "../../api/friends-api";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function useSocket(socket, setSocket, setFriendsList) {
  const { isAuthenticated, username } = useAuthContext();

  useEffect(() => {
    (async function socketService() {
      if (isAuthenticated) {
        try {
          const createSocket = io("http://localhost:5000");
          setSocket(createSocket);

          createSocket.emit("newUser");
        } catch (error) {
          toast.error(error.message);
        }
      }
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    socket?.on("newUserCreated", () => {
      (async function addOnlineUser() {
        try {
          await recordUserInOnlineUsers(username, socket.id);

          const friendsListResponse = await getUserFriendsAndTheirStatus();
          setFriendsList(friendsListResponse);

          const action = "userAuthenticated";
          await sendUpdateToOnlineFriends(
            socket,
            username,
            friendsListResponse,
            action
          );
        } catch (error) {
          toast.error(error.message);
        }
      })();
    });

    socket?.on("disconnect", () => {
      (async function removeOnlineUser() {
        try {
          await deleteUserInOnlineUsers();
        } catch (error) {
          toast.error(error.message);
        }
      })();
    });

    socket?.on("getFriendStatus", ({ senderInfo, action }) => {
      setFriendsList((prevFriendList) => {
        const newUpdatedFriendsLst = prevFriendList.filter(
          (friend) => friend.username !== senderInfo.username
        );
        if (action == "userAuthenticated") {
          newUpdatedFriendsLst.push({
            username: senderInfo.username,
            online: true,
            socketId: senderInfo.socketId,
            gameInProgress: senderInfo.gameInProgress,
          });
        } else if (action == "logout") {
          newUpdatedFriendsLst.push({
            username: senderInfo.username,
            online: false,
          });
        }

        return newUpdatedFriendsLst;
      });
    });
  }, [socket]);
}

export async function sendUpdateToOnlineFriends(
  socket,
  username,
  friendsList,
  action
) {
  const onlineFriends = friendsList.filter((friend) => friend.online == true);
  if (onlineFriends.length > 0) {
    await socket.emit("sendUserStatus", {
      senderInfo: { username, socketId: socket.id },
      receiverFriends: onlineFriends,
      action,
    });
  }
}
