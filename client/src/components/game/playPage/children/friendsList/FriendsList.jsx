import { useState } from "react";
import { toast } from "react-hot-toast";
import { checkIfUserExists } from "../../../../../../api/user-api";

import "./friendsList.css";

export default function FriendsList({ friendsList }) {

  const [friendInvitedUsername, setFriendInvitedUsername] = useState(null);

  const sendFriendInvitation = async () => {
    if (!friendInvitedUsername) {
      return;
    }

    let isUsernameInFriendList = false;
    friendsList.forEach(friend => {
      if (friend.username == friendInvitedUsername) {
        toast.error(friendInvitedUsername + ' is in your Friends List');
        isUsernameInFriendList = true;
        return;
      }
    });

    if (isUsernameInFriendList) {
      return;
    }

    try {
      const friendInvited = await checkIfUserExists(friendInvitedUsername);
      if (friendInvited.length == 0) {
        toast.error(friendInvitedUsername + ' does not exist')
      } else {
        
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="friends_list_wrapper">
      <h3>Friends List</h3>
      {friendsList.length > 0
        ?
        <ul>
          {friendsList.map((friend) => {
            return <li key={friend.username} className={friend.online ? "friend_online" : "friend_offline"}>
              <span className="friend_username">
                {friend.username}
              </span>
              {friend.online && <span className="friend_online_play">Invite</span>}
              <span className="friend_status">{friend.online ? 'Online' : 'Offline'}</span>
            </li>
          })}
        </ul>
        :
        <p>Invite friends and earn points!</p>
      }
      <p className="add_friend">
        <input type="text" placeholder="Friend Username" onChange={(event) => {
            setFriendInvitedUsername(event.target.value);
        }} />
        <button onClick={sendFriendInvitation}>Add Friend</button>
      </p>
    </div>
  );
}
