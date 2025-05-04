import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectRivalPlayer } from "../../gameSlice";
import { setSocketReq } from "../../../socket_connection/socketSlice";
import "./confirm.css";

export default function Confrim({ props }) {
  const { setShowConfirmMessage, setIsGameLeft } = props;
  const user = useSelector(selectCurrentUser);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const dispatch = useDispatch();

  const declineLeavingClickHandler = () => {
    setShowConfirmMessage(false);
  };

  const confirmLeavingClickHandler = async () => {
    dispatch(
      setSocketReq({
        socketReqName: "setExitGame",
        socketData: {
          receiverSocketId: rivalPlayer.socketId,
          username: user.username,
        },
      })
    );
    setIsGameLeft(true);
  };

  return (
    <div className="confirm-wrapper">
      <div className="confirm-message">
        <h2>Are you sure you want to leave the game?</h2>
        <div className="confirm-buttons">
          <button onClick={confirmLeavingClickHandler}>Yes</button>
          <button onClick={declineLeavingClickHandler}>No</button>
        </div>
      </div>
    </div>
  );
}
