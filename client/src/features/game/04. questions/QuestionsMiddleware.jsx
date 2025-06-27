import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { selectQuestionChosen, selectQuestions } from "./questionsSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectFirstPlayer, selectSecondPlayer } from "../playersSlice";
import { useRecordPlayerPointsMutation } from "../gameApiSlice";
import Score from "../score/Score";
import Questions from "./Questions";
import Answers from "../05. answers/Answers";
import ResultGame from "../06. final_result/ResultGame";
import "../game.css";

export default function QuestionsMiddleware() {
  const user = useSelector(selectCurrentUser);
  const firstPlayer = useSelector(selectFirstPlayer);
  const secondPlayer = useSelector(selectSecondPlayer);
  const questions = useSelector(selectQuestions);
  const questionChosen = useSelector(selectQuestionChosen);
  const [recordPlayerPoints] = useRecordPlayerPointsMutation();
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  useEffect(() => {
    (async () => {
      if (questionChosen == null) {
        let areAllQuestionsAnswered = true;

        for (let q = 0; q < questions.length; q++) {
          if (questions[q].answered == false) {
            areAllQuestionsAnswered = false;
            break;
          }
        }

        if (areAllQuestionsAnswered) {
          setIsLoadingResult(true);

          try {
            if (user.username == firstPlayer.username) {
              await recordPlayerPoints(firstPlayer.earnedPoints);
            } else {
              await recordPlayerPoints(secondPlayer.earnedPoints);
            }

            setTimeout(() => {
              setIsGameFinished(true);
            }, 2000);
          } catch (err) {
            toast.error(
              "Connecting to the server failed! Please refresh the page."
            );
            console.log(err.message);
          }
        }
      }
    })();
  }, [questionChosen]);

  return (
    <>
      {isGameFinished ? (
        <ResultGame />
      ) : (
        <div className="questions_page_wrapper">
          <Score />
          {questionChosen ? (
            <Answers />
          ) : (
            <Questions isLoadingResult={isLoadingResult} />
          )}
        </div>
      )}
    </>
  );
}
