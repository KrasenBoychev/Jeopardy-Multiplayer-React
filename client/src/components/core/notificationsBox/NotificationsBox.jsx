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
  notifications,
  setIsNewGameStarted,
}) {
  const { friendsList, setFriendsList } = friendsListProps;
  const { friendInvited, setFriendInvited } = friendInvitedProps;
  const { notificationsList, setNotificationsList } = notifications;
  const [notificationsBox, setNotificationsBox] = useState(false);

  const { isAuthenticated, username } = useAuthContext();

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
      if (msg == "friendRequestAccepted") {
        setFriendsList((prev) => [...prev, data.friendsListUpdate]);

        setNotificationsList((prev) => [
          ...prev,
          {
            username: data.notificationInfo.friendUsername,
            content: data.notificationInfo.content,
            type: msg,
            notificationBtns: data.notificationInfo.btns,
          },
        ]);
      } else {
        setNotificationsList((prev) => [
          ...prev,
          {
            username: data.friendUsername,
            content: data.content,
            type: msg,
            notificationBtns: data.btns,
          },
        ]);
      }
    });

    socket?.on("getGameInvitation", async ({ senderUsername }) => {
      const gameInvitation = {
        username: senderUsername,
        content: " sent game invitation",
        type: "gameInvitation",
        notificationBtns: "Accept/Reject",
      };
      setNotificationsList((prevNotifications) => [
        ...prevNotifications,
        gameInvitation,
      ]);

      toast.success(
        senderUsername + " sent game invitation -> check notifications"
      );
    });

    socket?.on("getAcceptGameInvitation", async ({ senderUsername }) => {
      setIsNewGameStarted(true);
      toast.success(senderUsername + " accepted game invitation");
    });

    socket?.on("getCancelGameInvitation", async ({ senderUsername }) => {
      removeNotificationFromNotificationsList(
        setNotificationsList,
        senderUsername,
        "gameInvitation"
      );
      toast.error(senderUsername + " cancelled game invitation");
    });

    socket?.on("getRejectGameInvitation", async ({ senderUsername }) => {
      await socket.emit("leaveRoom", {
        userUsername: username,
        friendUsername: senderUsername,
      });
      setFriendInvited(null);
      toast.error(senderUsername + " cancelled game invitation");
    });
  }, [socket]);

  return (
    <>
      <NotificationsHeader
        props={{ notificationsList, notificationsBox, setNotificationsBox }}
      />
      <NotificationsBody
        props={{
          socket,
          notificationsBox,
          friendsList,
          setFriendsList,
          notificationsList,
          setNotificationsList,
          friendInvited,
          setFriendInvited,
          setIsNewGameStarted,
        }}
      />
    </>
  );
}

export const removeNotificationFromNotificationsList = (
  setNotificationsList,
  senderUsername,
  type
) => {
  setNotificationsList((prevNotifications) =>
    prevNotifications.filter((notification) => {
      return (
        notification.username != senderUsername ||
        (notification.username == senderUsername && notification.type != type)
      );
    })
  );
};
