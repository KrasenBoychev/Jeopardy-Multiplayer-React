import { sendFriendResponse } from "../../../../../api/user-api";
import "./notificationsBox.css";

export default function NotificationsBox({ notificationsList }) {

  const acceptNotification = async (e) => {
    if (e.target.value == 'friendRequest') {
     const response = await sendFriendResponse(JSON.stringify({username: e.target.id, status: 'friendRequestAccepted'}));
    }
    // check if the friend is online and send socketrequest to update their friendList in the component
    // if not online, send them a notification saying your accepted their request
  }

  const rejectNotification = async (e) => {
    if (e.target.value == 'friendRequest') {
      const response = await sendFriendResponse(JSON.stringify({username: e.target.id, status: 'friendRequestRejected'}));
    }
    // check if the friend is online and send socketrequest to update their friendList in the component
    // if not online, send them a notification saying your rejected their request
  }

  //send invitation - check if the other is in your fRequests => if yes, don't send a fr request

  // add new button - Read - only for standart notification which don't have to accepted or rejected

  return (
    <div className="notifications_box_container">
      {notificationsList.length > 0
        ?
        <ul>
          {notificationsList.map((notification) => {
            return <li key={notification.username}>
              {notification.username + notification.content}
              <div className="notifications_box_btns">
                <button value={notification.type} id={notification.username} onClick={acceptNotification}>Accept</button>
                <button value={notification.type} id={notification.username} onClick={rejectNotification}>Reject</button>
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
