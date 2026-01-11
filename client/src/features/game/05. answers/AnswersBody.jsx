import { useDispatch, useSelector } from "react-redux";
import {
  selectActivePlayer,
  selectFirstPlayer,
  selectRoomId,
} from "../playersSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectQuestionChosen } from "../04. questions/questionsSlice";
import { selectAnswerChosen, selectIsAnswerCorrect } from "./answerSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import "./answers.css";

export default function AnswersBody({ answer }) {
  const roomId = useSelector(selectRoomId);
  const activePlayer = useSelector(selectActivePlayer);
  const firstPlayer = useSelector(selectFirstPlayer);
  const user = useSelector(selectCurrentUser);
  const questionChosen = useSelector(selectQuestionChosen);
  const answerChosen = useSelector(selectAnswerChosen);
  const isAnswerCorrect = useSelector(selectIsAnswerCorrect);
  const dispatch = useDispatch();

  const answerQuestionClickHandler = async () => {
    let setIsAnswerCorrect = false;
    let playerToUpdate = null;
    let pointsToAdd = 0;

    if (questionChosen.correctAnswer == answer) {
      setIsAnswerCorrect = true;

      playerToUpdate =
        activePlayer.username == firstPlayer.username
          ? "firstPlayer"
          : "secondPlayer";

      pointsToAdd = questionChosen.points;
    }

    dispatch(
      setSocketReq({
        socketReqName: "send_answer_chosen",
        socketData: {
          roomId,
          answer,
          setIsAnswerCorrect,
          playerToUpdate,
          pointsToAdd,
          questionChosen,
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
