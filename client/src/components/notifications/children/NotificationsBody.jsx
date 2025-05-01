import AcceptNotification from "../buttons/AcceptNotification";
import ReadNotification from "../buttons/ReadNotification";
import RejectNotification from "../buttons/RejectNotification";

export default function NotificationsBody({ notificationsProps }) {
  const { isSuccess, receivedNotifications } = notificationsProps;

  let content;
  if (isSuccess) {
    content = (
      <div className="notifications_box_container">
        {receivedNotifications.length > 0 ? (
          <ul>
            {receivedNotifications.map((notification) => {
              return (
                <li key={notification.username}>
                  {notification.username + notification.content}
                  <div className="notifications_box_btns">
                    {/* {notification.notificationBtns == "Accept/Reject" ? (
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
