import AcceptNotification from "../buttons/acceptNotification";
import ReadNotification from "../buttons/ReadNotification";
import RejectNotification from "../buttons/RejectNotification";

export default function NotificationsBody({ props }) 
{
  const {
    socket,
    notificationsBox,
    setFriendsList,
    notificationsList,
    setNotificationsList,
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
