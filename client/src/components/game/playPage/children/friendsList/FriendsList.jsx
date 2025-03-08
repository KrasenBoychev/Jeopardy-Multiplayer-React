import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { getFriendsOnline } from "../../../../../../api/requester";
import "./friendsList.css";

export default function FriendsList({ socket }) {
  const { userId, username, isAuthenticated } = useAuthContext();
  const [friendsList, setFriendsList] = useState([]);


  useEffect(() => {
    (async function getFriends() {
      if (isAuthenticated) {
        const allFriends = await getFriendsOnline(userId);
        setFriendsList(allFriends);

        const onlineFriends = allFriends.filter((friend) => friend.online == true);
        if (onlineFriends.length > 0) {
          await socket.emit("sendUserIsOnline", {
            senderInfo: { username, socketId: socket.id },
            receiverFriends: onlineFriends,
          });
        }
      }
    })();
  }, []);

  // update state dinamically when log out
  // check how to avoid the error when refreshing the page

  useEffect(() => {
    socket?.on("getFriendIsOnline", ({ senderInfo }) => {
      setFriendsList((prevFriendList) => {
        const newUpdatedFriendsLst = prevFriendList.filter((friend) => friend.username !== senderInfo.username);
        newUpdatedFriendsLst.push({ username: senderInfo.username, online: true, socketId: senderInfo.socketId });
        return newUpdatedFriendsLst;
      });
    });
  }, [socket]);


  return (
    <div className="friends_list_wrapper">
      <h3>Friends List</h3>
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
      <p className="add_friend">
        <input type="text" placeholder="Friend Username" />
        <button>Add Friend</button>
      </p>
    </div>
  );
}
