import { useDispatch, useSelector } from "react-redux";
import { setSocketReq } from "../../../../socket_connection/socketSlice";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import { updateGameReqSentBy } from "../../../gameSlice";

export default function GameReqBtns({ friend }) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const acceptGameReqClickHandler = async () => {
    dispatch(
      setSocketReq({
        socketReqName: "start_game",
        socketData: {
          targetUserId: friend[0],
        },
      })
    );
  };

  const rejectGameReqClickHandler = () => {
    dispatch(
      setSocketReq({
        socketReqName: "send_reject_game_res",
        socketData: {
          receiverSocketId: friend[0],
          username: user.username,
        },
      })
    );
    dispatch(
      updateGameReqSentBy({
        username: friend[1].username,
        updateType: "remove",
      })
    );
  };

  return (
    <div className="absolute right-0 flex items-center gap-2">
      <i
        className="fa-solid fa-circle-check text-green-500 cursor-pointer hover:text-white"
        onClick={acceptGameReqClickHandler}
      />
      <i
        className="fa-solid fa-circle-xmark text-destructive cursor-pointer hover:text-white"
        onClick={rejectGameReqClickHandler}
      />
    </div>
  );
}
