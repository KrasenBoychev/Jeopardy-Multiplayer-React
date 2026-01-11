import { useDispatch, useSelector } from "react-redux";
import { deletePlayersDetails, selectRoomId } from "../../playersSlice";
import { setSocketReq } from "../../../socket_connection/socketSlice";
import "./confirm.css";
import { deleteGameDetails } from "../../gameSlice";
import { deleteCategories } from "../../03. categories/categoriesSlice";
import { deleteQuestions } from "../../04. questions/questionsSlice";

export default function Confrim({ setShowConfirmMessage }) {
  const roomId = useSelector(selectRoomId);
  const dispatch = useDispatch();

  const declineLeavingClickHandler = () => {
    setShowConfirmMessage(false);
  };

  const confirmLeavingClickHandler = async () => {
    dispatch(
      setSocketReq({
        socketReqName: "leave_game",
        socketData: {
          roomId,
        },
      })
    );

    dispatch(deleteGameDetails());
    dispatch(deletePlayersDetails());
    dispatch(deleteCategories());
    dispatch(deleteQuestions());
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
