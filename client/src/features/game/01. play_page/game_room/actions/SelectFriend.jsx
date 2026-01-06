import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import { selectFriends } from "../../friends_list/friendsSlice";
import { selectGameReqSentBy } from "../../../gameSlice";
import { updateRivalPlayer } from "../../../playersSlice";
import { setSocketReq } from "../../../../socket_connection/socketSlice";
import toast from "react-hot-toast";
import GameReqBtns from "./GameReqBtns";

export default function SelectFriend({ friend }) {
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const gameReqSentBy = useSelector(selectGameReqSentBy);
  const dispatch = useDispatch();

  const inviteFriendClickHandler = async (friendUsername) => {
    if (gameReqSentBy.includes(friendUsername)) {
      return;
    }

    const findFriend = friends.find(
      (friend) => friend.username == friendUsername
    );

    if (
      findFriend &&
      findFriend.online &&
      !findFriend.gameInProgress &&
      !gameReqSentBy.includes(findFriend.username)
    ) {
      dispatch(
        setSocketReq({
          socketReqName: "sendGameReq",
          socketData: {
            receiverSocketId: findFriend.socketId,
            username: user.username,
          },
        })
      );

      dispatch(
        updateRivalPlayer({
          username: friendUsername,
          socketId: findFriend.socketId,
          updateType: "add",
        })
      );

      toast.success("Game request sent to " + friendUsername);
    } else {
      toast.error(friendUsername + "is either offline or in game");
    }
  };

  return (
    <li
      className={`flex justify-between gap-2 cursor-pointer rounded-sm ${
        !gameReqSentBy.includes(friend.username) &&
        "hover:bg-white hover:text-black"
      }`}
      onClick={() => inviteFriendClickHandler(friend.username)}
    >
      <div className="flex flex-1">
        <span className="flex-1 text-center">{friend.username}</span>
        {gameReqSentBy.includes(friend.username) && (
          <GameReqBtns friendUsername={friend.username} />
        )}
      </div>
    </li>
  );
}
