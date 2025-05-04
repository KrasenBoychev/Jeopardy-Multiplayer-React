import { useDispatch, useSelector } from "react-redux";
import { selectRivalPlayer, updateRivalPlayer } from "../../../../gameSlice";
import { selectCurrentUser } from "../../../../../authentication/authSlice";
import { selectFriends } from "../../friendsList/friendsSlice";
import { setSocketReq } from "../../../../../socket_connection/socketSlice";
import toast from "react-hot-toast";

export default function CancelGameInvitation() {
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const dispatch = useDispatch();

  const gameCancelationClickHandler = async () => {
    const findFriend = friends.find((friend) => friend.username == rivalPlayer);

    if (findFriend && findFriend.online && !findFriend.gameInProgress) {
      dispatch(
        setSocketReq({
          socketReqName: "setCancelGameInvitation",
          socketData: {
            receiverSocketId: findFriend.socketId,
            username: user.username,
          },
        })
      );
    } else {
      toast.error("Cannot start game with " + rivalPlayer);
    }

    dispatch(
      updateRivalPlayer({ username: rivalPlayer, updateType: "remove" })
    );
  };

  return (
    <button
      className="game_room_cancel_btn"
      onClick={gameCancelationClickHandler}
    >
      Cancel
    </button>
  );
}
