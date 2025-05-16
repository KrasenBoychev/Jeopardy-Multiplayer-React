import { useDispatch, useSelector } from "react-redux";
import { selectFriends, setFriends } from "./friendsSlice";
import { selectGameReqSentBy } from "../../../gameSlice";
import AddFriendBtn from "./children/AddFriendBtn";
import GameReqBtns from "./children/GameReqBtns";
import "./friendsList.css";
import { useGetFriendsDetailsMutation } from "./friendsApiSlice";
import { useEffect } from "react";
import { selectCurrentUser } from "../../../../authentication/authSlice";

export default function FriendsList() {
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const gameReqSentBy = useSelector(selectGameReqSentBy);
  const [getFriendsDetails, { isLoading }] = useGetFriendsDetailsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const getFriendsServerRes = await getFriendsDetails(
        user.gameDetails.friendsList
      );
      const friendsList = getFriendsServerRes.data;

      if (friendsList) {
        dispatch(setFriends(friendsList));
      }
    })();
  }, []);

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
