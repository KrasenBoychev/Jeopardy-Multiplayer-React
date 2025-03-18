import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getUserNotifications } from "../../../../api/user-api";

import NotificationsHeader from "./children/NotificationsHeader";
import NotificationsBody from "./children/NotificationsBody";

import "./notificationsBox.css";

export default function NotificationsBox({
  socket,
  friendsListProps,
  friendInvitedProps,
  gameFriendResponseProps,
  notifications,
}) {
  const { friendsList, setFriendsList } = friendsListProps;
  const { friendInvited, setFriendInvited } = friendInvitedProps;
  const { gameFriendResponse, setGameFriendResponse } = gameFriendResponseProps;
  const { notificationsList, setNotificationsList } = notifications;
  const [notificationsBox, setNotificationsBox] = useState(false);

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    (async function getNotificationsFunc() {
      if (isAuthenticated) {
        try {
          const userNotifications = await getUserNotifications();
          setNotificationsList(userNotifications);
        } catch (error) {
          toast.error(error.message);
        }
      }
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    socket?.on("getNotification", async ({ msg, data }) => {
      try {
        const userNotifications = await getUserNotifications();
        setNotificationsList(userNotifications);

        if (msg == "friendRequestAccepted") {
          setFriendsList((prev) => [...prev, data]);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });

    socket?.on("getGameInvitation", async ({ data }) => {
      if (!friendInvited) {
        setFriendInvited(data.username);
        setGameFriendResponse("gameInvitationReceived");
      } else {
        await socket.emit("sendGameRejection", {
          receiverSocketId: data.socketId,
        });
      }
    });

    socket?.on("getGameRejection", async ({}) => {
      setGameFriendResponse("otherPlayerRoomBusy");
    });
  }, [socket]);

  useEffect(() => {
    if (gameFriendResponse == "gameInvitationReceived") {
      toast.success("Game invitation received from " + friendInvited);
    } else if (gameFriendResponse == "otherPlayerRoomBusy") {
      toast.error("Game invitation received from " + friendInvited);
      setFriendInvited(null);
    }
  }, [gameFriendResponse]);

  useEffect(() => {
    (async function changePlayerStatus() {
      const onlineFriends = friendsList.filter(
        (friend) => friend.online == true
      );
      if (onlineFriends.length > 0) {
        await socket.emit("sendUserStatus", {
          senderInfo: { username, socketId: socket.id },
          receiverFriends: onlineFriends,
          action: "changeToGameInProgress",
        });
      }
    })();
  }, [friendInvited]);

  return (
    <>
      <NotificationsHeader
        props={{ notificationsList, notificationsBox, setNotificationsBox }}
      />
      <NotificationsBody
        props={{
          socket,
          notificationsBox,
          setFriendsList,
          notificationsList,
          setNotificationsList,
        }}
      />
    </>
  );
}
