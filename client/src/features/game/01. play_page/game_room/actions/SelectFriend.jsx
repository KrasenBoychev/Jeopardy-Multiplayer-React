import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../authentication/authSlice";
// import { selectFriends } from "../../friends_list/friendsSlice";
import { selectGameReqSentBy } from "../../../gameSlice";
import { updateRivalPlayer } from "../../../playersSlice";
import { setSocketReq } from "../../../../socket_connection/socketSlice";
import toast from "react-hot-toast";
import GameReqBtns from "./GameReqBtns";

export default function SelectFriend({ friend }) {
  const user = useSelector(selectCurrentUser);
  // const friends = useSelector(selectFriends);
  const gameReqSentBy = useSelector(selectGameReqSentBy);
  const dispatch = useDispatch();

  const inviteFriendClickHandler = async () => {
    dispatch(
      setSocketReq({
        socketReqName: "start_game",
        socketData: {
          targetUserId: friend[0],
        },
      })
    );

    // if (gameReqSentBy.includes(friend[1])) {
    //   return;
    // }
    // const findFriend = friends.find((friend) => friend.username === friend[1]);
    // if (
    //   findFriend &&
    //   findFriend.online &&
    //   !findFriend.gameInProgress &&
    //   !gameReqSentBy.includes(findFriend.username)
    // ) {
    //   dispatch(
    //     setSocketReq({
    //       socketReqName: "sendGameReq",
    //       socketData: {
    //         receiverSocketId: findFriend.socketId,
    //         username: user.username,
    //       },
    //     })
    //   );
    //   dispatch(
    //     updateRivalPlayer({
    //       username: friend[1],
    //       socketId: findFriend.socketId,
    //       updateType: "add",
    //     })
    //   );
    //   toast.success("Game request sent to " + friend[1]);
    // } else {
    //   toast.error(friend[1] + " is either offline or in game");
    // }
  };

  return (
    <li
      className={`flex justify-between gap-2 cursor-pointer rounded-sm ${
        !gameReqSentBy.includes(friend[1].username) &&
        "hover:bg-white hover:text-black"
      }`}
      onClick={() => inviteFriendClickHandler()}
    >
      <div className="flex flex-1">
        <span className="flex-1 text-center">{friend[1].username}</span>
        {gameReqSentBy.includes(friend[1].username) && (
          <GameReqBtns friendUsername={friend[1].username} />
        )}
      </div>
    </li>
  );
}
