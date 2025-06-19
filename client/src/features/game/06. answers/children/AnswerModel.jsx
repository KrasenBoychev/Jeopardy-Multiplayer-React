import { useDispatch, useSelector } from "react-redux";
import { selectActivePlayer, selectRivalPlayer } from "../../playersSlice";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectQuestionChosen } from "../../05. questions/questionsSlice";
import {
  selectAnswerChosen,
  selectIsAnswerCorrect,
  setAnswerChosen,
  updateIsAnswerCorrect,
} from "../answerSlice";
import "../answers.css";
import { setSocketReq } from "../../../socket_connection/socketSlice";

export default function AnswerModel({ answer }) {
  const rivalPlayer = useSelector(selectRivalPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);
  const questionChosen = useSelector(selectQuestionChosen);
  const answerChosen = useSelector(selectAnswerChosen);
  const isAnswerCorrect = useSelector(selectIsAnswerCorrect);
  const dispatch = useDispatch();

  const answerQuestionClickHandler = async () => {
    let setIsAnswerCorrect = false;
    if (questionChosen.correctAnswer == answer) {
      setIsAnswerCorrect = true;
    }

    dispatch(updateIsAnswerCorrect(setIsAnswerCorrect));
    dispatch(setAnswerChosen(answer));
    dispatch(
      setSocketReq({
        socketReqName: "sendAnswerChosen",
        socketData: {
          receiverSocketId: rivalPlayer.socketId,
          answer,
          setIsAnswerCorrect,
        },
      })
    );
  };

  return (
    <button
      className={`answer_box px-8 py-2 bg-black text-white text-sm rounded-md font-semibold opacity-60
         ${
           isAnswerCorrect == null &&
           user.username === activePlayer.username &&
           "answer_box_active opacity-100 hover:bg-ring/[0.8] hover:shadow-lg"
         }
        ${
          isAnswerCorrect != null &&
          questionChosen.correctAnswer == answer &&
          "answer_correct"
        }
        ${
          isAnswerCorrect != null &&
          questionChosen.correctAnswer != answer &&
          "answer_wrong"
        }
        ${isAnswerCorrect != null && answerChosen == answer && "answer_chosen"}
        `}
      disabled={
        user.username != activePlayer.username || answerChosen ? true : false
      }
      onClick={answerQuestionClickHandler}
    >
      {answer}
    </button>
  );
}
