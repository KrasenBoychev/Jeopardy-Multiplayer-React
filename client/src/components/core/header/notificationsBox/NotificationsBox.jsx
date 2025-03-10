import "./notificationsBox.css";

export default function NotificationsBox({ notificationsList }) {
  return (
    <div className="notifications_box_container">
      {notificationsList.length > 0
        ?
        <ul>
          {notificationsList.map((notification) => {
            return <li key={notification.username}>
              {notification.username + notification.content}
              <div className="notifications_box_btns">
                <button>Accept</button>
                <button>Reject</button>
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
