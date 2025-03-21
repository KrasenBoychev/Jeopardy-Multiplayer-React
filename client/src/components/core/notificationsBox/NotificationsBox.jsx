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
}) {
  const { friendsList, setFriendsList } = friendsListProps;
  const { friendInvited, setFriendInvited } = friendInvitedProps;
  const { notificationsList, setNotificationsList } = notifications;
  const [notificationsBox, setNotificationsBox] = useState(false);
  const [updateNotifications, setUpdateNotifications] = useState(false);

  const { isAuthenticated, username } = useAuthContext();

  useEffect(() => {
    (async function getNotificationsFunc() {
      if (isAuthenticated) {
        try {
          const userNotifications = await getUserNotifications();
          setNotificationsList(userNotifications);

          if (updateNotifications) {
            setUpdateNotifications(false);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    })();
  }, [isAuthenticated, updateNotifications]);

  useEffect(() => {
    socket?.on("getNotification", async ({ msg, data }) => {
      try {
        setUpdateNotifications(true);

        if (msg == "friendRequestAccepted") {
          setFriendsList((prev) => [...prev, data]);
        }
      } catch (error) {
        toast.error(error.message);
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

    socket?.on("getCancelGameInvitation", async ({ senderUsername }) => {
      setNotificationsList((prevNotifications) => {
        return prevNotifications.filter((notification) => {
          notification.username == senderUsername &&
            notification.type == "gameInvitation";
        });
      });

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
          setUpdateNotifications,
        }}
      />
    </>
  );
}
