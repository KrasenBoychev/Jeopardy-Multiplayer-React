import { useState } from "react";
import "./friendsList.css";

export default function FriendsList() {
  const [friendOnline, setFriendOnline] = useState(true);

  return (
    <div className="friends_list_wrapper">
      <h3>Friends List</h3>
      <ul>
        <li className={friendOnline ? "friend_online" : "friend_offline"}>
          <span className="friend_username">
            Someoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </span>
          {friendOnline && <span className="friend_online_play">Play</span>}
          <span className="friend_status">Online</span>
        </li>

        <li className={!friendOnline ? "friend_online" : "friend_offline"}>
          <span className="friend_username">
            Someoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </span>
          {!friendOnline && <span className="friend_online_play">Play</span>}
          <span className="friend_status">Offline</span>
        </li>

        <li className={friendOnline ? "friend_online" : "friend_offline"}>
          <span className="friend_username">
            Someoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </span>
          {friendOnline && <span className="friend_online_play">Play</span>}
          <span className="friend_status">Online</span>
        </li>

        <li className={!friendOnline ? "friend_online" : "friend_offline"}>
          <span className="friend_username">
            Someoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </span>
          {!friendOnline && <span className="friend_online_play">Play</span>}
          <span className="friend_status">Offline</span>
        </li>

        <li className={friendOnline ? "friend_online" : "friend_offline"}>
          <span className="friend_username">
            Someoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </span>
          {friendOnline && <span className="friend_online_play">Play</span>}
          <span className="friend_status">Online</span>
        </li>
      </ul>
      <p className="add_friend">
        <input type="text" placeholder="Friend Username" />
        <button>Add Friend</button>
      </p>
    </div>
  );
}
