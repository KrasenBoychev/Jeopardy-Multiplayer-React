import AcceptNotification from "../buttons/AcceptNotification";
import ReadNotification from "../buttons/ReadNotification";
import RejectNotification from "../buttons/RejectNotification";

export default function NotificationsBody({ props }) 
{
  const {
    socket,
    notificationsBox,
    friendsList,
    setFriendsList,
    notificationsList,
    setNotificationsList,
    friendInvited,
    setUpdateNotifications,
  } = props;
  
  return (
    <>
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
                              setFriendsList,
                              friendInvited,
                              setUpdateNotifications
                            }}
                          />
                          <RejectNotification
                            props={{
                              socket,
                              friendsList,
                              notification,
                              setNotificationsList,
                              setUpdateNotifications,
                            }}
                          />
                        </>
                      ) : (
                        <ReadNotification
                          props={{ notification, setUpdateNotifications }}
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
