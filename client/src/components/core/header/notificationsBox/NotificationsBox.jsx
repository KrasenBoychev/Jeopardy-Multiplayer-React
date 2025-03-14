import toast from "react-hot-toast";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { removeNotification, sendFriendResponse } from "../../../../../api/user-api";
import "./notificationsBox.css";

export default function NotificationsBox({ socket, setFriendsList, notifications }) {
  const { notificationsList, setNotificationsList } = notifications;
  const { username } = useAuthContext();

  const acceptNotification = async (e) => {
    const friendUsername = e.target.id;

    if (e.target.value == 'friendRequest') {
      try {
        const response = await sendFriendResponse(JSON.stringify({ username: friendUsername, status: 'friendRequestAccepted' }));

        if (response.status == 'online') {
          await socket.emit("sendNotification", {
            receiverSocketId: response.friendSocketDetails.socketId,
            msg: 'friendRequestAccepted',
            data: { username, online: true, socketId: socket.id }
          });

          setFriendsList((prev) => [...prev, { username: friendUsername, online: true, socketId: response.friendSocketDetails.socketId }]);
        } else {
          setFriendsList((prev) => [...prev, { username: friendUsername, online: false }]);
        }

        setNotificationsList(response.userDetails.notifications);

      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  const rejectNotification = async (e) => {
    const friendUsername = e.target.id;

    if (e.target.value == 'friendRequest') {
      try {
        const response = await sendFriendResponse(JSON.stringify({ username: friendUsername, status: 'friendRequestRejected' }));

        if (response.status == 'online') {
          await socket.emit("sendNotification", {
            receiverSocketId: response.friendSocketDetails.socketId,
          });
        }

        setNotificationsList(response.userDetails.notifications);
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  const readNotification = async (e) => {
    try {
      const friendUsername = e.target.id;
      const response = await removeNotification(friendUsername);

      setNotificationsList(response.notifications);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="notifications_box_container">
      {notificationsList.length > 0
        ?
        <ul>
          {notificationsList.map((notification) => {
            return <li key={notification.username}>
              {notification.username + notification.content}
              <div className="notifications_box_btns">
                {notification.notificationBtns == 'Accept/Reject'
                  ?
                  <>
                    <button className="notification_btn_accept" value={notification.type} id={notification.username} onClick={acceptNotification}>Accept</button>
                    <button className="notification_btn_reject" value={notification.type} id={notification.username} onClick={rejectNotification}>Reject</button>
                  </>
                  :
                  <button className="notification_btn_read" id={notification.username} onClick={readNotification}>Mark as read</button>
                }

              </div>
            </li>
          })}
        </ul>
        :
        <p>There are no notifications at the moment</p>
      }
    </div>
  );
}
