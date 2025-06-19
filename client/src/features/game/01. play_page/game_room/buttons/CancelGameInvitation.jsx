import { useDispatch, useSelector } from "react-redux";
import { selectRivalPlayer, updateRivalPlayer } from "../../../playersSlice";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import { setSocketReq } from "../../../../socket_connection/socketSlice";

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
      className="bg-destructive text-sm p-2 rounded-xl text-white lowercase hover:cursor-pointer hover:font-bold z-9999"
      onClick={gameCancelationClickHandler}
    >
      Cancel
    </button>
  );
}
