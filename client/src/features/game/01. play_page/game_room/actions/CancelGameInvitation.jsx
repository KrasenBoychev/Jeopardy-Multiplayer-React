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
    <>
      <h3 className="pb-2 text-[18px] text-center border-b-[1px] border-b-chart-5 uppercase font-bold">
        Waiting for opponent...
      </h3>
      <p className="flex-1 self-center content-center text-[40px]">
        {rivalPlayer.username}
      </p>
      <button
        className="bg-destructive text-sm p-2 rounded-xl text-white lowercase cursor-pointer hover:text-black"
        onClick={gameCancelationClickHandler}
      >
        Cancel
      </button>
    </>
  );
}
