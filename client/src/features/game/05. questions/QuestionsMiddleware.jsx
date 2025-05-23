import { useSelector } from "react-redux";
import { selectIsQuestionChosen } from "./questionsSlice";
import { selectIsGameFinished } from "../gameSlice";
import Questions from "./Questions";
import Score from "../score/Score";
import Timer from "../timer/Timer";

export default function QuestionsMiddleware() {
  const isQuestionChosen = useSelector(selectIsQuestionChosen);
  const isGameFinished = useSelector(selectIsGameFinished);

  return (
    <>
      {isGameFinished ? (
        <div>result</div>
      ) : (
        <div className="questions_page_wrapper">
          <Score />
          {isQuestionChosen ? <div>answers</div> : <Questions />}
          <Timer />
        </div>
      )}
    </>
  );
}
