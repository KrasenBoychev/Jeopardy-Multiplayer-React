import { useState } from "react";
import { useGetNotificationsQuery } from "./notificationsApiSlice";
import NotificationsHeader from "./children/NotificationsHeader";
import NotificationsBody from "./children/NotificationsBody";
import "./notifications.css";

export default function Notifications() {
  const [notificationsOpened, setNotificationsOpened] = useState(false);
  const {
    data: notifications,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotificationsQuery("getNotifications");

  return (
    <>
      <NotificationsHeader
        notificationsProps={{
          isSuccess,
          notifications,
          notificationsOpened,
          setNotificationsOpened,
        }}
      />
      {notificationsOpened && (
        <NotificationsBody
          notificationsProps={{
            isSuccess,
            notifications,
          }}
        />
      )}
    </>
  );
}

export const removeNotificationFromNotificationsList = () =>
  // setNotificationsList,
  // senderUsername,
  // type
  {
    // setNotificationsList((prevNotifications) =>
    //   prevNotifications.filter((notification) => {
    //     return (
    //       notification.username != senderUsername ||
    //       (notification.username == senderUsername && notification.type != type)
    //     );
    //   })
    // );
  };

// useEffect(() => {
//   socket?.on("getNotification", ({ msg, data }) => {
//     if (msg == "friendRequestAccepted") {
//       setFriendsList((prev) => [...prev, data.friendsListUpdate]);

//       setNotificationsList((prev) => [
//         ...prev,
//         {
//           username: data.notificationInfo.friendUsername,
//           content: data.notificationInfo.content,
//           type: msg,
//           notificationBtns: data.notificationInfo.btns,
//         },
//       ]);
//     } else {
//       setNotificationsList((prev) => [
//         ...prev,
//         {
//           username: data.friendUsername,
//           content: data.content,
//           type: msg,
//           notificationBtns: data.btns,
//         },
//       ]);
//     }
//   });

//   socket?.on("getGameInvitation", ({ senderUsername }) => {
//     const gameInvitation = {
//       username: senderUsername,
//       content: " sent game invitation",
//       type: "gameInvitation",
//       notificationBtns: "Accept/Reject",
//     };
//     setNotificationsList((prevNotifications) => [
//       ...prevNotifications,
//       gameInvitation,
//     ]);

//     toast.success(
//       senderUsername + " sent game invitation -> check notifications"
//     );
//   });

//   socket?.on(
//     "getAcceptGameInvitation",
//     async ({ senderUsername, roomName, playersInfo }) => {
//       const { startingPlayerDetails, otherPlayerDetails } = playersInfo;

//       setFirstPlayer({
//         username: startingPlayerDetails.username,
//         socketId: startingPlayerDetails.socketId,
//       });
//       setSecondPlayer({
//         username: otherPlayerDetails.username,
//         socketId: otherPlayerDetails.socketId,
//       });

//       await socket.emit("joinRoom", { gameRoomName: roomName });

//       setGameRoomName(roomName);
//       setIsNewGameStarted(true);
//       toast.success(senderUsername + " accepted game invitation");
//     }
//   );

//   socket?.on("getCancelGameInvitation", ({ senderUsername }) => {
//     removeNotificationFromNotificationsList(
//       setNotificationsList,
//       senderUsername,
//       "gameInvitation"
//     );
//     toast.error(senderUsername + " cancelled game invitation");
//   });

//   socket?.on("getRejectGameInvitation", async ({ senderUsername }) => {
//     setFriendInvited(null);
//     toast.error(senderUsername + " cancelled game invitation");
//   });
// }, [socket]);
