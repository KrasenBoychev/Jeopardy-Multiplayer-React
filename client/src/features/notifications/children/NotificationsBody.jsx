import { notifTypes } from "../notificationsType";
import AcceptNotification from "../buttons/AcceptNotification";
import ReadNotification from "../buttons/ReadNotification";
import RejectNotification from "../buttons/RejectNotification";

export default function NotificationsBody({ notificationsProps }) {
  const { isSuccess, isError, notifications } = notificationsProps;

  let content = (
    <div className="notifications_box_container">
      {isSuccess && notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => {
            return (
              <li key={notification.type + notification.sentBy}>
                {notification.sentBy + notifTypes[notification.type].content}
                <div className="notifications_box_btns">
                  {notifTypes[notification.type].btns == "Accept/Reject" ? (
                    <>
                      <AcceptNotification notification={notification} />
                      <RejectNotification notification={notification} />
                    </>
                  ) : (
                    <ReadNotification notification={notification} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There are no notifications at the moment</p>
      )}
      {isError && <p>Cannot load notifications!</p>}
    </div>
  );

  return content;
}
