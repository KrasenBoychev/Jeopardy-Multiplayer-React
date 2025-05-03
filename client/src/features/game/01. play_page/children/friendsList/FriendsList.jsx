import { useSelector } from "react-redux";
import { selectFriends } from "./friendsSlice";
import { selectGameReqSentBy } from "../../../gameSlice";
import AddFriendBtn from "./children/AddFriendBtn";
import GameReqBtns from "./children/GameReqBtns";
import "./friendsList.css";

export default function FriendsList() {
  const friends = useSelector(selectFriends);
  const gameReqSentBy = useSelector(selectGameReqSentBy);

  return (
    <div className="friends_list_wrapper">
      <h3>Friends List</h3>
      {friends.length > 0 ? (
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
                {gameReqSentBy.includes(friend.username) ? (
                  <GameReqBtns friendUsername={friend.username} />
                ) : (
                  <span className="friend_status">
                    {friend.online && !friend.gameInProgress && "Online"}
                    {friend.online &&
                      friend.gameInProgress &&
                      "Game in progress"}
                    {!friend.online && "Offline"}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Invite friends and earn points!</p>
      )}
      <AddFriendBtn />
    </div>
  );
}
