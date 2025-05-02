import AcceptNotification from "../buttons/AcceptNotification";
import ReadNotification from "../buttons/ReadNotification";
import RejectNotification from "../buttons/RejectNotification";
import { notifTypes } from "../notificationsType";

export default function NotificationsBody({ notificationsProps }) {
  const { isSuccess, notifications } = notificationsProps;

  let content;
  if (isSuccess) {
    content = (
      <div className="notifications_box_container">
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => {
              return (
                <li key={notification.type + notification.sentBy}>
                  {notification.sentBy + notifTypes[notification.type].content}
                  <div className="notifications_box_btns">
                    {/* {notifTypes[notification.type].btns == "Accept/Reject" ? (
                  <>
                    <AcceptNotification
                      props={{
                        socket,
                        notification,
                        friendsList,
                        setFriendsList,
                        friendInvited,
                        setFriendInvited,
                        setNotificationsList,
                        setIsNewGameStarted,
                        setFirstPlayer,
                        setSecondPlayer,
                        setGameRoomName,
                      }}
                    />
                    <RejectNotification
                      props={{
                        socket,
                        friendsList,
                        notification,
                        setNotificationsList,
                      }}
                    />
                  </>
                ) : (
                  <ReadNotification
                    props={{ notification, setNotificationsList }}
                  />
                )} */}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>There are no notifications at the moment</p>
        )}
      </div>
    );
  }

  return content;

  // return (
  //   <>
  //     {notificationsBox && (
  //       <div className="notifications_box_container">
  //         {notificationsList.length > 0 ? (
  //           <ul>
  //             {notificationsList.map((notification) => {
  //               return (
  //                 <li key={notification.username}>
  //                   {notification.username + notification.content}
  //                   <div className="notifications_box_btns">
  //                     {/* {notification.notificationBtns == "Accept/Reject" ? (
  //                       <>
  //                         <AcceptNotification
  //                           props={{
  //                             socket,
  //                             notification,
  //                             friendsList,
  //                             setFriendsList,
  //                             friendInvited,
  //                             setFriendInvited,
  //                             setNotificationsList,
  //                             setIsNewGameStarted,
  //                             setFirstPlayer,
  //                             setSecondPlayer,
  //                             setGameRoomName,
  //                           }}
  //                         />
  //                         <RejectNotification
  //                           props={{
  //                             socket,
  //                             friendsList,
  //                             notification,
  //                             setNotificationsList,
  //                           }}
  //                         />
  //                       </>
  //                     ) : (
  //                       <ReadNotification
  //                         props={{ notification, setNotificationsList }}
  //                       />
  //                     )} */}
  //                   </div>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         ) : (
  //           <p>There are no notifications at the moment</p>
  //         )}
  //       </div>
  //     )}
  //   </>
  // );
}
