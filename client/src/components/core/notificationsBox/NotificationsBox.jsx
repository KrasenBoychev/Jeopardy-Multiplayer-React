import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getUserNotifications } from "../../../../api/user-api";

import AcceptNotification from "./buttons/acceptNotification";
import RejectNotification from "./buttons/RejectNotification";
import ReadNotification from "./buttons/ReadNotification";
import "./notificationsBox.css";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  useEffect(() => {
    if (notificationsBox) {
      setNotificationsBox(!notificationsBox)
    }
  }, [location]);

  const openNotifications = () => {
    setNotificationsBox(!notificationsBox);
  };

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
      <div
        className={
          notificationsList.length > 0
            ? "notifications_header notifications_unread"
            : "notifications_header"
        }
        onClick={openNotifications}
      >
        <i className="fa-solid fa-message"></i>
        <p>{notificationsList.length}</p>
      </div>
      {notificationsBox && (
        <div className="notifications_box_container">
          {notificationsList.length > 0 ? (
            <ul>
              {notificationsList.map((notification) => {
                return (
                  <li key={notification.username}>
                    {notification.username + notification.content}
                    <div className="notifications_box_btns">
                      {notification.notificationBtns == "Accept/Reject" ? (
                        <>
                          <AcceptNotification
                            props={{
                              socket,
                              notification,
                              setNotificationsList,
                              setFriendsList,
                            }}
                          />
                          <RejectNotification
                            props={{
                              socket,
                              notification,
                              setNotificationsList,
                            }}
                          />
                        </>
                      ) : (
                        <ReadNotification
                          props={{ notification, setNotificationsList }}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>There are no notifications at the moment</p>
          )}
        </div>
      )}
    </>
  );
}
