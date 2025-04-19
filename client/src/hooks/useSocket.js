import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  recordUserInOnlineUsers,
  deleteUserInOnlineUsers,
} from "../../api/user-api";

import { getUserFriendsAndTheirStatus } from "../../api/friends-api";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { removeNotificationFromNotificationsList } from "../components/core/notificationsBox/NotificationsBox";

export default function useSocket(
  socket,
  setSocket,
  setFriendsList,
  setNotificationsList
) {
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
        if (action == "friendIsOnline") {
          return prevFriendList.map((friendInfo) =>
            friendInfo.username == senderInfo.username
              ? {
                  ...friendInfo,
                  online: true,
                  socketId: senderInfo.socketId,
                  gameInProgress: senderInfo.gameInProgress,
                }
              : friendInfo
          );
        } else if (action == "friendIsOffline") {
          return prevFriendList.map((friendInfo) =>
            friendInfo.username == senderInfo.username
              ? {
                  ...friendInfo,
                  online: false,
                  socketId: null,
                  gameInProgress: null,
                }
              : friendInfo
          );
        } else if (action == "changeGameInProgress") {
          return prevFriendList.map((friendInfo) =>
            friendInfo.username == senderInfo.username
              ? {
                  ...friendInfo,
                  gameInProgress: senderInfo.gameInProgress,
                }
              : friendInfo
          );
        }
      });
      if (action == "friendIsOffline" || action == "changeGameInProgress") {
        removeNotificationFromNotificationsList(
          setNotificationsList,
          senderInfo.username,
          "gameInvitation"
        );
      }
    });
  }, [socket]);
}

export async function sendUpdateToOnlineFriends(
  socket,
  username,
  friendsList,
  action
) {
  const onlineFriends = friendsList.filter((friend) => friend.online == true && !friend.gameInProgress);
  if (onlineFriends.length > 0) {
    await socket.emit("sendUserStatus", {
      senderInfo: { username, socketId: socket.id },
      receiverFriends: onlineFriends,
      action,
    });
  }
}
