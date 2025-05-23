import { useSelector } from "react-redux";
import { selectQuestionChosen } from "./questionsSlice";
import { selectIsGameFinished } from "../gameSlice";
import Questions from "./Questions";
import Score from "../score/Score";
import Timer from "../timer/Timer";

export default function QuestionsMiddleware() {
  const questionChosen = useSelector(selectQuestionChosen);
  const isGameFinished = useSelector(selectIsGameFinished);

  return (
    <>
      {isGameFinished ? (
        <div>result</div>
      ) : (
        <div className="questions_page_wrapper">
          <Score />
          {questionChosen ? <div>answers</div> : <Questions />}
          <Timer />
        </div>
      )}
    </>
  );
}
