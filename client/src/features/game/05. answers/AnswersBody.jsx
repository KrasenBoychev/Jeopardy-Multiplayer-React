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
      className={`px-4 py-3 text-white text-[20px] text-left rounded-sm font-semibold opacity-50
         ${isAnswerCorrect == null && "bg-black"}
         ${
           isAnswerCorrect == null &&
           user.username === activePlayer.username &&
           "opacity-100 cursor-pointer hover:shadow-[inset_0_0_10px_orange]"
         }
        ${
          isAnswerCorrect != null &&
          questionChosen.correctAnswer == answer &&
          "bg-active-player"
        }
        ${
          isAnswerCorrect != null &&
          questionChosen.correctAnswer != answer &&
          "bg-destructive"
        }
        ${
          isAnswerCorrect != null &&
          answerChosen == answer &&
          "border border-solid border-white"
        }
        max-[1800px]:text-[19px] max-[1600px]:text-[18px] max-[1400px]:text-[17px] `}
      disabled={
        user.username != activePlayer.username || answerChosen ? true : false
      }
      onClick={answerQuestionClickHandler}
    >
      {answer}
    </button>
  );
}
