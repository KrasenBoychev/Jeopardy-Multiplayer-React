import { useDispatch, useSelector } from "react-redux";
import { selectRivalPlayer, updateRivalPlayer } from "../../../../gameSlice";
import { selectCurrentUser } from "../../../../../authentication/authSlice";
import { setSocketReq } from "../../../../../socket_connection/socketSlice";

export default function CancelGameInvitation() {
  const user = useSelector(selectCurrentUser);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const dispatch = useDispatch();

  const gameCancelationClickHandler = async () => {
    dispatch(
      setSocketReq({
        socketReqName: "setCancelGameInvitation",
        socketData: {
          receiverSocketId: rivalPlayer.socketId,
          username: user.username,
        },
      })
    );

    dispatch(
      updateRivalPlayer({
        username: rivalPlayer.username,
        updateType: "remove",
      })
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
