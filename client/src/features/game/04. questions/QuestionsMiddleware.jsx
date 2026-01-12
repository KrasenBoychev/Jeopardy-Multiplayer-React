import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectQuestionChosen,
  selectQuestionsAnswered,
} from "./questionsSlice";
import {
  selectFirstPlayer,
  selectRoomId,
  selectSecondPlayer,
} from "../playersSlice";
import Score from "../score/Score";
import Questions from "./Questions";
import Answers from "../05. answers/Answers";
import ResultGame from "../06. final_result/ResultGame";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { selectIsGameCompleted } from "../gameSlice";
import { selectCurrentUser } from "../../authentication/authSlice";

export default function QuestionsMiddleware() {
  const user = useSelector(selectCurrentUser);
  const firstPlayer = useSelector(selectFirstPlayer);
  const secondPlayer = useSelector(selectSecondPlayer);
  const questionChosen = useSelector(selectQuestionChosen);
  const questionsAnswered = useSelector(selectQuestionsAnswered);
  const isGameCompleted = useSelector(selectIsGameCompleted);
  const roomId = useSelector(selectRoomId);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (questionsAnswered == 16 && user.username == firstPlayer.username) {
        dispatch(
          setSocketReq({
            socketReqName: "send_game_result",
            socketData: {
              roomId,
              firstPlayer,
              secondPlayer,
            },
          })
        );
      }
    })();
  }, [questionsAnswered]);

  return (
    <>
      {isGameCompleted ? (
        <ResultGame />
      ) : (
        <>
          <Score />
          <div className="w-fit h-full flex">
            {questionChosen ? <Answers /> : <Questions />}
          </div>
        </>
      )}
    </>
  );
}
