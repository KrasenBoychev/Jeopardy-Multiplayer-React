import "./notificationsBox.css";

export default function NotificationsBox() {
  return (
    <div className="notifications_box_container">
      <ul>
        <li>
          Someone sent game invitation
          <div className="notifications_box_btns">
            <button>Accept</button>
            <button>Reject</button>
          </div>
        </li>

        <li>
          Someone sent friend request
          <div className="notifications_box_btns">
            <button>Accept</button>
            <button>Reject</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
