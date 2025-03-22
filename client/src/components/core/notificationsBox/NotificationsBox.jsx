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
  setPlayersProps,
  gameRoomNameProps,
}) {
  const { friendsList, setFriendsList } = friendsListProps;
  const { friendInvited, setFriendInvited } = friendInvitedProps;
  const {
    notificationsList,
    setNotificationsList,
  } = notifications;
  const { setFirstPlayer, setSecondPlayer } = setPlayersProps;
  const { gameRoomName, setGameRoomName } = gameRoomNameProps;

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
    socket?.on("getNotification", ({ msg, data }) => {
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

    socket?.on("getGameInvitation", ({ senderUsername }) => {
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

    socket?.on(
      "getAcceptGameInvitation",
      async ({ senderUsername, roomName, playersInfo }) => {
        const { startingPlayerDetails, otherPlayerDetails } = playersInfo;

        setFirstPlayer({
          username: startingPlayerDetails.username,
          socketId: startingPlayerDetails.socketId,
        });
        setSecondPlayer({
          username: otherPlayerDetails.username,
          socketId: otherPlayerDetails.socketId,
        });

        await socket.emit("joinRoom", { gameRoomName: roomName });

        setGameRoomName(roomName);
        setIsNewGameStarted(true);
        toast.success(senderUsername + " accepted game invitation");
      }
    );

    socket?.on("getCancelGameInvitation", ({ senderUsername }) => {
      removeNotificationFromNotificationsList(
        setNotificationsList,
        senderUsername,
        "gameInvitation"
      );
      toast.error(senderUsername + " cancelled game invitation");
    });

    socket?.on("getRejectGameInvitation", async ({ senderUsername }) => {
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
          setFirstPlayer,
          setSecondPlayer,
          setGameRoomName,
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
