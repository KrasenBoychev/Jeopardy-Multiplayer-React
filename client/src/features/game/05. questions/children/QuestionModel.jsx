import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectActivePlayer, selectRivalPlayer } from "../../playersSlice";
import "../questions.css";
import { updateQuestionChosen } from "../questionsSlice";
import { setSocketReq } from "../../../socket_connection/socketSlice";

export default function QuestionModel({ question }) {
  const activePlayer = useSelector(selectActivePlayer);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const showQuestionClickHandler = async () => {
    dispatch(updateQuestionChosen(question));
    dispatch(
      setSocketReq({
        socketReqName: "sendQuestionChosen",
        socketData: {
          receiverSocketId: rivalPlayer.socketId,
          questionChosen: question,
        },
      })
    );
  };

  return (
    <button
      className={
        question.answered
          ? "question_box question_answered"
          : user.username === activePlayer.username
          ? "question_box active_box"
          : "question_box inactive_box"
      }
      disabled={user.username === activePlayer.username ? false : true}
      onClick={showQuestionClickHandler}
    >
      {question.points}
    </button>
  );
}
