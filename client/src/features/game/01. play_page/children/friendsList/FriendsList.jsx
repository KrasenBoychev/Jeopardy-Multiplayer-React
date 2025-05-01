import { useState } from "react";
import AddFriendBtn from "./AddFriendBtn";
import "./friendsList.css";
import { useSelector } from "react-redux";
import { selectFriends } from "./friendsSlice";

export default function FriendsList() {
  const [addFriendUsername, setAddFriendUsername] = useState("");
  const friends = useSelector(selectFriends);

  return (
    <div className="friends_list_wrapper">
      <h3>Friends List</h3>
      {friends ? (
        <ul>
          {friends.map((friend) => {
            return (
              <li
                key={friend.username}
                className={
                  friend.gameInProgress
                    ? "friend_game_in_progress"
                    : friend.online
                    ? "friend_online"
                    : "friend_offline"
                }
              >
                <span className="friend_username">{friend.username}</span>
                <span className="friend_status">
                  {friend.online && !friend.gameInProgress && "Online"}
                  {friend.online && friend.gameInProgress && "Game in progress"}
                  {!friend.online && "Offline"}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Invite friends and earn points!</p>
      )}
      <p className="add_friend">
        <input
          type="text"
          placeholder="Friend Username"
          value={addFriendUsername}
          onChange={(event) => {
            setAddFriendUsername(event.target.value);
          }}
        />
        {/* <AddFriendBtn
          addFriendUsername={addFriendUsername}
          socket={socket}
          friends={friends}
          setAddFriendUsername={setAddFriendUsername}
        /> */}
      </p>
    </div>
  );
}
