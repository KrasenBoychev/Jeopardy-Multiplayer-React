import { useState } from "react";
import AddFriendBtn from "./AddFriendBtn";
import "./friendsList.css";

export default function FriendsList({ socket, friendsList, friendProps }) {
  const [addFriendUsername, setAddFriendUsername] = useState("");

  return (
    <div className="friends_list_wrapper">
      <h3>Friends List</h3>
      {friendsList.length > 0 ? (
        <ul>
          {friendsList.map((friend) => {
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
        <AddFriendBtn
          addFriendUsername={addFriendUsername}
          socket={socket}
          friendsList={friendsList}
          setAddFriendUsername={setAddFriendUsername}
        />
      </p>
    </div>
  );
}
